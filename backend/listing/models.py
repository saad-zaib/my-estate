from django.db import models
from django.utils.timezone import now, timedelta
from realtors.models import Realtor
from django.utils.text import slugify
import uuid

class RentListing(models.Model):
    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=225, unique=True)
    title = models.CharField(max_length=225)
    color = models.CharField(max_length=225,null=True)
    colorHex = models.CharField(max_length=225,null=True)
    address = models.CharField(max_length=225)
    city = models.CharField(max_length=225)
    state = models.CharField(max_length=225)
    zipcode = models.CharField(max_length=225)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(null=True)
    originalPrice = models.PositiveIntegerField(null=True)
    bedrooms = models.PositiveIntegerField(null=True)
    garden = models.PositiveIntegerField(null=True)
    floor = models.PositiveIntegerField(null=True)
    kitchen = models.PositiveIntegerField(null=True)
    bathrooms = models.PositiveIntegerField(null=True)
    garage = models.PositiveIntegerField(default=0, null=True)
    sqrft = models.PositiveIntegerField(null=True)
    open_house = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to="photo/%Y/%m/%d")
    photo_1 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_2 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_3 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_4 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_5 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_6 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_7 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    # Promotion fields
    is_promotion = models.BooleanField(default=False)
    promotion_days = models.PositiveIntegerField(null=True, blank=True)
    promotion_end_date = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title + "-" + str(uuid.uuid4())[:8])
        if self.is_promotion and self.promotion_days:
            self.promotion_end_date = now() + timedelta(days=self.promotion_days)
        elif self.is_promotion and self.promotion_end_date and now() > self.promotion_end_date:
            self.is_promotion = False
            self.promotion_days = None
            self.promotion_end_date = None
        super().save(*args, **kwargs)


class SaleListing(models.Model):
    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=225, unique=True)
    title = models.CharField(max_length=225)
    address = models.CharField(max_length=225)
    color = models.CharField(max_length=225,null=True)
    colorHex = models.CharField(max_length=225,null=True)
    city = models.CharField(max_length=225)
    state = models.CharField(max_length=225)
    zipcode = models.CharField(max_length=225)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(null=True)
    originalPrice = models.PositiveIntegerField(null=True)
    bedrooms = models.PositiveIntegerField(null=True)
    garden = models.PositiveIntegerField(null=True)
    floor = models.PositiveIntegerField(null=True)
    kitchen = models.PositiveIntegerField(null=True)
    bathrooms = models.PositiveIntegerField(null=True)
    garage = models.PositiveIntegerField(null=True)
    sqrft = models.PositiveIntegerField(null=True)
    open_house = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to="photo/%Y/%m/%d")
    photo_1 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_2 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_3 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_4 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_5 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_6 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    photo_7 = models.ImageField(upload_to="photo/%Y/%m/%d", blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    # Promotion fields
    is_promotion = models.BooleanField(default=False)
    promotion_days = models.PositiveIntegerField(null=True, blank=True)
    promotion_end_date = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title + "-" + str(uuid.uuid4())[:8])
        if self.is_promotion and self.promotion_days:
            self.promotion_end_date = now() + timedelta(days=self.promotion_days)
        elif self.is_promotion and self.promotion_end_date and now() > self.promotion_end_date:
            self.is_promotion = False
            self.promotion_days = None
            self.promotion_end_date = None
        super().save(*args, **kwargs)
