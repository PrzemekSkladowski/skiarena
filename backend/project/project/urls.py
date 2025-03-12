"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from django.conf.urls import url
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('weather-reports/', views.WeatherReportView.as_view(), name="weather_report"),
    path('weather-reports/<int:pk>/', views.WeatherReportView.as_view(), name="weather_report_detail"),
    path('skipasses/', views.SkipassListView.as_view(), name="skipass_list"),
    path('skipasses/<int:pk>/', views.SkipassListView.as_view(), name="skipass_detail"),
    path('skipass-offers/', views.SkipassOfferListView.as_view(), name="skipass_offer_list")
]
