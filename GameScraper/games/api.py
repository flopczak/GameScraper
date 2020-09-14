from games.models import Item, Account
from rest_framework import viewsets, permissions
from .serializers import GameSerializer, AccountSerializer
from django.core.exceptions import PermissionDenied

# Account Viewset
class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = AccountSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        return self.request.user.accounts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
