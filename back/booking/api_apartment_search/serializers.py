from rest_framework import serializers
from . import models


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CountryModel
        fields = ('name',)
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'name': {'label': 'Страна'},
        }


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RegionModel
        fields = ('name',)
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'name': {'label': 'Регион'},
        }


class CitySerializer(serializers.ModelSerializer):
    country = serializers.CharField(source='country.name', label="Страна")
    region = serializers.CharField(source='region.name', label="Регион")

    class Meta:
        model = models.CityModel
        fields = ('name', 'country', 'region')
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'name': {'label': 'Город'},
        }


class StreetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StreetTypeModel
        fields = "__all__"
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'street_type': {'label': 'Тип улицы'},
        }


class AddressSerializer(serializers.ModelSerializer):
    street_type = serializers.CharField(source='street_type.street_type', label="Тип улицы")

    class Meta:
        model = models.AddressModel
        fields = ('street_name', 'building_number', 'corps', 'location', 'street_type', 'has_elevator')
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'street_name': {'label': 'Название улицы'},
            'building_number': {'label': 'Номер дома'},
            'corps': {'label': 'Корпус'},
            'location': {'label': 'Местоположение'},
            'has_elevator': {'label': 'Наличие лифта'},
        }


class BuildingTypeSerializer(serializers.ModelSerializer):
    building_type_group = serializers.CharField(source='building_type_group.building_group_type', label="Группа строения")

    class Meta:
        model = models.BuildingTypeModel
        fields = ('building_type_name', 'building_type_group')
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'building_type_name': {'label': 'Тип строения'},
        }


class GeneralInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GeneralInformationModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'room_square': {'label': 'Площадь комнаты'},
            'floor': {'label': 'Этаж'},
            'floor_in_the_house': {'label': 'Этажей в доме'},
            'rooms_count': {'label': 'Количество комнат'},
            'guests_count': {'label': 'Количество гостей'},
            'count_sleeping_places': {'label': 'Количество спальных мест'},
            'kitchen': {'label': 'Кухня'},
            'room_repair': {'label': 'Ремонт комнаты'},
        }


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ImagesModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'image_path': {'label': 'Путь до изображения'},
            'room_object': {'label': 'Объект'},
        }


class UpdateRatingObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ObjectRoomModel
        fields = (
            "id",
            "rating",
        )
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'id': {'label': 'ID'},
            'rating': {'label': 'Рейтинг'},
        }


class PlacingRulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlacingRulesModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'with_children': {'label': 'С детьми любого возраста'},
            'with_animals': {'label': 'С животными'},
            'smoking_is_allowed': {'label': 'Курение разрешено'},
            'parties_are_allowed': {'label': 'Вечеринки разрешены'},
            'accounting_documents': {'label': 'Предоставление документов'},
        }


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("username", "id")
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'username': {'label': 'Имя пользователя'},
            'id': {'label': 'ID'},
        }


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RatingModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'cleanliness': {'label': 'Чистота'},
            'conformity_to_photos': {'label': 'Соответствие фото'},
            'timeliness_of_check_in': {'label': 'Своевременность заселения'},
            'price_quality': {'label': 'Цена-качество'},
            'location': {'label': 'Расположение'},
            'quality_of_service': {'label': 'Качество обслуживания'},
            'object_room': {'label': 'Объект'},
        }


class ReviewsSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer()
    user = CustomUserSerializer()
    review_updated = serializers.DateTimeField(format="%d-%m-%Y %H:%M")
    review_created = serializers.DateTimeField(format="%d-%m-%Y %H:%M")

    class Meta:
        model = models.ReviewsModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'review_text': {'label': 'Отзыв'},
            'review_created': {'label': 'Дата создания'},
            'review_updated': {'label': 'Дата редактирования'},
            'likes': {'label': 'Нравится'},
            'dislikes': {'label': 'Не нравится'},
            'room_object': {'label': 'Объект'},
            'user': {'label': 'Пользователь'},
            'ratings': {'label': 'Оценки'},
        }


class ObjectRoomSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    building_info = BuildingTypeSerializer(read_only=True)
    general_info = GeneralInformationSerializer(read_only=True)
    placing_rules = PlacingRulesSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    update_datetime = serializers.DateTimeField(format="%d-%m-%Y %H:%M")

    class Meta:
        model = models.ObjectRoomModel
        fields = '__all__'
        read_only_fields = ('create_datetime',)
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'title': {'label': 'Название объекта'},
            'building_description': {'label': 'Описание объекта'},
            'prepayment': {'label': 'Предоплата'},
            'payment_day': {'label': 'Оплата за сутки'},
            'payment_method': {'label': 'Метод оплаты'},
            'address': {'label': 'Адрес'},
            'arrival_time': {'label': 'Заезд'},
            'departure_time': {'label': 'Отъезд'},
            'minimum_length_of_stay': {'label': 'Минимальное количество дней заселения'},
            'placing_rules': {'label': 'Правила размещения'},
            'general_info': {'label': 'Общая информация'},
            'building_info': {'label': 'Информация о строении'},
            'city': {'label': 'Город'},
            'update_datetime': {'label': 'Дата обновления'},
            'is_published': {'label': 'Опубликовано ?'},
            'owner': {'label': 'Собственник'},
        }


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ReservationModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'tenant': {'label': 'Жилец'},
            'room': {'label': 'Комната'},
            'start_date': {'label': 'Заселение'},
            'end_date': {'label': 'Выселение'},
            'is_confirmed': {'label': 'Подтверждено'},
        }


class AllStarsObjectRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RatingModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'cleanliness': {'label': 'Чистота'},
            'conformity_to_photos': {'label': 'Соответствие фото'},
            'timeliness_of_check_in': {'label': 'Своевременность заселения'},
            'price_quality': {'label': 'Цена-качество'},
            'location': {'label': 'Расположение'},
            'quality_of_service': {'label': 'Качество обслуживания'},
            'object_room': {'label': 'Объект'},
        }


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FavoritesModel
        fields = '__all__'
        # Добавляем verbose_name для документации
        extra_kwargs = {
            'room_object': {'label': 'Объект'},
            'user': {'label': 'Пользователь'},
            'create_datetime': {'label': 'Дата создания'},
        }