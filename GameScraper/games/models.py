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

class GamesModel(models.Model):
    title = models.CharField(max_length=150)
    price = models.FloatField()
    console = models.CharField(max_length=150)
    img = models.CharField(max_length=300)
    link = models.CharField(max_length=300)
    date = models.DateTimeField(auto_now_add=True, blank=True)

class HistoryModel(models.Model):
    game_id = models.ForeignKey(GamesModel, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    price = models.FloatField()
    date = models.DateTimeField(auto_now_add=True,blank=True)

class AccountGames(models.Model):
    account_id = models.ForeignKey(User, on_delete=models.CASCADE)
    game_id = models.ForeignKey(GamesModel, on_delete=models.CASCADE)

class GamesChanged(models.Model):
    game_id = models.ForeignKey(GamesModel, on_delete=models.CASCADE)

