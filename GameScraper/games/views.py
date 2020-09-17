from rest_framework.pagination import LimitOffsetPagination
from rest_framework import viewsets, generics
from games.models import GamesModel
from games.serializers import GameSerializer
from rest_framework.filters import SearchFilter, OrderingFilter

class GamesViewSet(viewsets.ModelViewSet,generics.ListAPIView):
    pagination_class = LimitOffsetPagination
    serializer_class = GameSerializer
    filter_backends = (SearchFilter, OrderingFilter,)
    search_fields = ('title', 'id')
    def get_queryset(self):
        queryset = GamesModel.objects.all()
        console = self.request.query_params.get('console',None)
        if console is not None:
            queryset = queryset.filter(console__contains = console)
        return queryset



class QueryViewSet(viewsets.ModelViewSet,generics.ListAPIView):
    pagination_class = LimitOffsetPagination
    serializer_class = GameSerializer
    def get_queryset(self):
        queryset = GamesModel.objects.all()
        console = self.request.query_params.get('console')
        queryset = queryset.filter(console = console)
        return queryset
