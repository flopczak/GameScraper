from rest_framework import serializers
from games.models import Account, GamesModel, HistoryModel, AccountGames


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

#Account Serializer
class AccountGamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountGames
        fields = '__all__'
        read_only_fields = ['account_id']

    def validate(self, attrs):
        # print(self.context['request'].user)
        attrs['account_id'] = self.context['request'].user
        return attrs

