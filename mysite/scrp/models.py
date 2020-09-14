from django.db import models

class GamesModel(models.Model):
    title = models.CharField(max_length=150)
    price = models.FloatField()
    console = models.CharField(max_length=150)
    img = models.CharField(max_length=300)
    link = models.CharField(max_length=300)
