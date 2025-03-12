from django.shortcuts import render
from rest_framework.views import APIView
from .models import WeatherReport, Skipass, SkipassOffer
from .serializer import WeatherReportSerializer, SkipassSerializer, SkipassOfferSerializer
from rest_framework.response import Response
from rest_framework import status


class SkipassListView(APIView):
    serializer_class = SkipassSerializer

    def get(self, request):
        skipasses = Skipass.objects.all()
        serializer = SkipassSerializer(skipasses, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = SkipassSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def put(self, request, pk):
        try:
            skipass = Skipass.objects.get(pk=pk)
        except Skipass.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = SkipassSerializer(skipass, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            skipass = Skipass.objects.get(pk=pk)
        except Skipass.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        skipass.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SkipassOfferListView(APIView):
    serializer_class = SkipassOfferSerializer

    def get(self, request):
        skipasses = SkipassOffer.objects.all()
        serializer = SkipassOfferSerializer(skipasses, many=True)
        return Response(serializer.data)

class WeatherReportView(APIView):
    serializer_class = WeatherReportSerializer

    def get(self, request):
        queryset = WeatherReport.objects.all()
        serializer = WeatherReportSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WeatherReportSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def delete(self, request, pk):
        try:
            weather_report = WeatherReport.objects.get(pk=pk)
        except WeatherReport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        weather_report.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
