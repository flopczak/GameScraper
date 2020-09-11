from games.models import Item, Account
from rest_framework import viewsets, permissions
from .serializers import GameSerializer, AccountSerializer

# Account Viewset
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AccountSerializer