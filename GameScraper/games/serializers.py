from rest_framework import serializers
from games.models import Account, GamesModel


#Item Serializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamesModel
        fields = '__all__'

#Account Serializer 
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'