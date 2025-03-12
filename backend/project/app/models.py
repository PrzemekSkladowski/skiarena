from django.db import models

class Skipass(models.Model):
    skier_name = models.CharField(max_length=100)
    skipass_type = models.CharField(max_length=100)
    purchase_date = models.DateTimeField()
    expiry_date = models.DateTimeField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    issued_by = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.skier_name} - {self.skipass_type}"
    
    # def save(self, *args, **kwargs):
    #     # Custom logic (e.g. generate QR code based on skipass data) - to be done later
    #     super(Skipass, self).save(*args, ).save(*args, **kwargs)

class SkipassOffer(models.Model):
    offer_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_hours = models.IntegerField()
    duration_days = models.IntegerField()

class WeatherReport(models.Model):
    location = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
