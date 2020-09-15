from django.db import models

class GamesModel(models.Model):
    title = models.CharField(max_length=150)
    price = models.FloatField()
    console = models.CharField(max_length=150)
    img = models.CharField(max_length=300)
    link = models.CharField(max_length=300)

class HistoryModel(models.Model):
    game_id = models.IntegerField()
    title = models.CharField(max_length=150)
    price = models.FloatField()
    date = models.DateTimeField(auto_now_add=True,blank=True)
