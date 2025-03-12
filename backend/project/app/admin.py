from django.contrib import admin
from .models import WeatherReport, Skipass, SkipassOffer


class SkipassAdmin(admin.ModelAdmin):
    list_display = ['skier_name', 'skipass_type', 'purchase_date', 'expiry_date', 'purchase_price', 'is_active']
    search_fields = ['skier_name', 'skipass_type']

class SkipassOfferAdmin(admin.ModelAdmin):
    list_display = ['offer_name', 'price', 'duration_hours', 'duration_days']
    search_fields = ['offer_name', 'price', 'duration_hours', 'duration_days']

class WeatherReportAdmin(admin.ModelAdmin):
    list_display = ['id', 'location', 'description']

admin.site.register(WeatherReport, WeatherReportAdmin)
admin.site.register(Skipass, SkipassAdmin)
admin.site.register(SkipassOffer, SkipassOfferAdmin)
