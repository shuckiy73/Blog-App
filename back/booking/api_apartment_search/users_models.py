from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


class UserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name="Пользователь")
    company_name = models.CharField(max_length=100, verbose_name="Название компании")
    location = models.CharField(max_length=100, verbose_name="Местоположение")
    birth_date = models.DateField(verbose_name="Дата рождения")
    phone = PhoneNumberField(verbose_name="Номер телефона")  # Используем PhoneNumberField для валидации номера
    rating = models.FloatField(default=0.0, verbose_name="Рейтинг")

    class Meta:
        verbose_name = "Профиль пользователя"
        verbose_name_plural = "Профили пользователей"

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.user.username})"