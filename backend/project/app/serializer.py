from rest_framework import serializers
from .models import WeatherReport, Skipass, SkipassOffer


class SkipassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skipass
        fields = '__all__'

class SkipassOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkipassOffer
        fields = '__all__'

class WeatherReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherReport
        fields = ["id", "location", "description"]
