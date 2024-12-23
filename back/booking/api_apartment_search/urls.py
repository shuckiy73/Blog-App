from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

# Создаем маршрутизатор для API
router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')  # Страны
router.register(r'search', views.SearchMainPageViewSet, basename='search')  # Поиск объектов
router.register(r'object_reviews', views.ReviewsViewSet, basename='object_reviews')  # Отзывы об объектах
router.register(r'get_object_rating', views.AllStarsObjectRoomViewSet, basename='get_object_rating')  # Рейтинг объектов
router.register(r'get_count_of_views', views.GetCountOfReviewViewset, basename='get_count_of_views')  # Количество отзывов

# Основные маршруты приложения
urlpatterns = [
    # Включаем маршруты, зарегистрированные в маршрутизаторе
    path('', include(router.urls)),

    # Бронирование и избранное
    path('booking/<int:id>/', views.BookingViewSet.as_view(), name='booking'),  # Бронирование объекта
    path('images/<int:room_object_id>/', views.ImagesViewSet.as_view(), name='get_object_images'),  # Получение изображений объекта
    path('update_rating/', views.UpdateRatingViewSet.as_view(), name="update_rating"),  # Обновление рейтинга объекта
    path('add_to_favorite/', views.FavoriteViewSet.as_view(), name="add_to_favorite"),  # Добавление объекта в избранное

    # Аутентификация и управление токенами
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Получение JWT-токена
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Обновление JWT-токена
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Проверка JWT-токена
    path('auth/register/', views.RegistrationAPIView.as_view(), name='register'),  # Регистрация пользователя
    path('auth/login/', views.LoginAPIView.as_view(), name='login'),  # Вход пользователя
    path('auth/logout/', views.LogoutAPIView.as_view(), name='logout'),  # Выход пользователя
    path('auth/reset-all-token/', views.ResetTokenAPIView.as_view(), name='reset-all-token'),  # Сброс всех токенов
]

# Документация API
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation for your project",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns += [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]