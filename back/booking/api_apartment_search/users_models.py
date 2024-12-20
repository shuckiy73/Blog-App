from django.db import models
from django.contrib.auth.models import User

class UserModel(User):
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    birth_date = models.DateField()
    phone = models.CharField(max_length=100)  # TODO изменить тип поля если не подойдет CharField
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField  # Установите библиотеку django-phonenumber-field


class UserModel(User):
    company_name = models.CharField(max_length=100, verbose_name="Название компании")
    location = models.CharField(max_length=100, verbose_name="Местоположение")
    birth_date = models.DateField(verbose_name="Дата рождения")
    phone = PhoneNumberField(verbose_name="Номер телефона")  # Используем PhoneNumberField для валидации номера
    rating = models.FloatField(default=0.0, verbose_name="Рейтинг")

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"
