from rest_framework import serializers
from games.models import Account, GamesModel, HistoryModel


#Item Serializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamesModel
        fields = '__all__'

#Item Serializer
class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryModel
        fields = '__all__'

#Account Serializer 
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class GameScrapingSerializer(serializers.Serializer):
   """Your data serializer, define your fields here."""
   title = serializers.CharField(max_length=150)
   price = serializers.IntegerField()
   # description = serializers.CharField(max_length=1000)
   picture = serializers.CharField(max_length=300)
   link = serializers.CharField(max_length=300)