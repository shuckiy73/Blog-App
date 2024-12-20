from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.db.models import Q, Count, ExpressionWrapper, F, FloatField, Avg
from django.db.models.functions.comparison import NullIf
from django.utils.dateparse import parse_date
from rest_framework import viewsets, filters, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
from django.utils import timezone

from . import models
from . import serializers

from .api_auth_views import RegistrationAPIView, LoginAPIView, LogoutAPIView, ResetTokenAPIView

# для JWT-токена
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

from .models import ReservationModel
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.authentication import authentication


# ===============


# Create your views here.
class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.CountryModel.objects.all()
    serializer_class = serializers.CountrySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class RegionViewSet(viewsets.ModelViewSet):
    queryset = models.RegionModel.objects.all()
    serializer_class = serializers.RegionSerializer


class UpdateRatingViewSet(APIView):  # TODO переписать на новую систему оценок
    serializer_class = serializers.UpdateRatingObjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            room_pk = serializer.validated_data.get('id')
            rating_value = serializer.validated_data.get('rating_value')
            if room_pk:
                if rating_value and room_pk:
                    room_object = models.ObjectRoomModel.objects.get(pk=room_pk)
                    room_object.votes += 1
                    room_object.rating_sum += rating_value
                    room_object.rating = round(room_object.rating_sum / room_object.votes, 4)
                    room_object.save()
                    return Response({'success': f'Rating is update, pk={room_pk}'})
            else:
                return Response({'error': f'id is invalid, id={room_pk}'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchMainPageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ObjectRoomSerializer
    filter_backends = (filters.SearchFilter,)
    permission_classes = (permissions.AllowAny,)
    search_fields = ('title', 'city__name', 'city__country__name')

    def get_queryset(self):
        pk = self.kwargs.get('pk', None)
        if pk and pk.isdigit():
            return get_object_or_404(models.ObjectRoomModel, pk=int(pk))

        search = self.request.query_params.get('search', None)
        arrive = parse_date(self.request.query_params.get('arrive', None))
        departure = parse_date(self.request.query_params.get('departure', None))

        if not search:
            return models.ObjectRoomModel.objects.none()

        queryset = models.ObjectRoomModel.objects.select_related(
            'city', 'building_info', 'general_info'
        ).filter(
            Q(title__icontains=search) |
            Q(city__name__icontains=search) |
            Q(city__country__name__icontains=search),
            is_published=True
        )

        if arrive and departure:
            reservations = models.ReservationModel.objects.filter(
                Q(start_date__lte=departure) & Q(end_date__gte=arrive)
            )
            room_id_list = reservations.values_list('room_id', flat=True)
            queryset = queryset.exclude(pk__in=room_id_list)

        return queryset


class ReviewsViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ReviewsSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        object_id = self.kwargs.get('room_object_id', None)
        if object_id and object_id.isdigit():
            return get_object_or_404(models.ReviewsModel, room_object_id=int(object_id))
        return models.ReviewsModel.objects.all()

    def retrieve(self, request, pk=None):
        queryset = models.ReviewsModel.objects.filter(room_object_id=pk)
        serializer = serializers.ReviewsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AllStarsObjectRoomViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = models.RatingModel.objects.all()

    def retrieve(self, request, pk=None):
        queryset = models.RatingModel.objects.filter(object_room_id=pk).aggregate(
            Avg("cleanliness", default=0),
            Avg("conformity_to_photos", default=0),
            Avg("timeliness_of_check_in", default=0),
            Avg("price_quality", default=0),
            Avg("location", default=0),
            Avg("quality_of_service", default=0),
        )
        return Response(queryset, status=status.HTTP_200_OK)


class GetCountOfReviewViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ReviewsSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        object_id = self.kwargs.get('room_object_id', None)
        if object_id and object_id.isdigit():
            return get_object_or_404(models.ReviewsModel, room_object_id=int(object_id))
        return models.ReviewsModel.objects.all()

    def retrieve(self, request, pk=None):
        queryset = models.ReviewsModel.objects.filter(room_object_id=pk).count()
        return Response({"reviews_count": queryset}, status=status.HTTP_200_OK)


class BookingViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.ReservationSerializer

    def post(self, request, *args, **kwargs):
        object_id = request.data.get('id')
        arrive = parse_date(request.data.get('arrive'))
        departure = parse_date(request.data.get('departure'))
        tenant = request.data.get('tenant')

        if not object_id or not arrive or not departure or not tenant:
            return Response({'error': 'Не все обязательные поля заполнены'}, status=status.HTTP_400_BAD_REQUEST)

        if arrive >= departure:
            return Response({'error': 'Дата заезда должна быть раньше даты отъезда'}, status=status.HTTP_400_BAD_REQUEST)

        if arrive < timezone.now().date():
            return Response({'error': 'Дата заезда уже прошла'}, status=status.HTTP_400_BAD_REQUEST)

        if models.ReservationModel.objects.filter(
            room_id=object_id,
            start_date__lte=departure,
            end_date__gte=arrive
        ).exists():
            return Response({'error': 'Указанные даты заняты'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.ReservationSerializer(data={
            'tenant': tenant,
            'room': object_id,
            'start_date': arrive,
            'end_date': departure,
            'is_confirmed': True
        })

        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Дата забронирована!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImagesViewSet(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.ImagesSerializer

    def get(self, *args, **kwargs):
        object_id = self.kwargs.get('room_object_id', None)
        if object_id and object_id.isdigit():
            queryset = models.ImagesModel.objects.filter(room_object_id=int(object_id))
            serializer = serializers.ImagesSerializer(queryset, many=True)
            return Response({"images": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Неверный формат ID объекта'}, status=status.HTTP_400_BAD_REQUEST)


class FavoriteViewSet(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.FavoriteSerializer

    def post(self, request, *args, **kwargs):
        object_id = request.data.get('room_object')
        user = request.data.get('user')

        if not object_id or not user:
            return Response({'error': 'Не все обязательные поля заполнены'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Добавлено в избранное!'}, status=status.HTTP_200_OK)
        else:
            models.FavoritesModel.objects.filter(user_id=user, room_object_id=object_id).delete()
            return Response({'success': 'Объект удален из избранного!'}, status=status.HTTP_200_OK)