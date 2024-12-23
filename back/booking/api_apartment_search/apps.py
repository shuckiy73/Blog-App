from django.apps import AppConfig

class ApiApartmentSearchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api_apartment_search'

    def ready(self):
        # Удалите эту строку, если сигналы не нужны
        # import api_apartment_search.signals
        pass