from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


PLATFORMS = [('', ''), ('PS3', 'PlayStation 3'), ('PS4', 'PlayStation 4'), ('PSV', 'PlayStation Vita'),
             ('PSP', 'PlayStation Portable'), ('PS2', 'PlayStation 2'), ]


class Account(models.Model):
    owner = models.ForeignKey(User, related_name="accounts", on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=400, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    title = models.SlugField(blank=False)
    price = models.FloatField(null=True)
    platform = models.CharField(max_length=3, choices=PLATFORMS, default=' ')
    ps_id = models.CharField(max_length=50, blank=True)
    image = models.SlugField(blank=True)
    age_rating = models.IntegerField(default=99)
    trailer_url = models.SlugField(blank=True)
    onsale = models.BooleanField(default=False)
    tag = models.SlugField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class ItemPrice(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    historical_price = models.FloatField(null=True)
    date_fetched = models.DateTimeField(auto_now_add=True)



class BasketItem(models.Model):
    owner = models.ForeignKey(User,related_name="Bascet", null=True, blank=True, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)


class Carousel(models.Model):
    image_url = models.SlugField()