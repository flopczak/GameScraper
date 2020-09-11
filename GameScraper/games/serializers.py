from rest_framework import serializers
from games.models import Item, Account


#Item Serializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

#Account Serializer 
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'