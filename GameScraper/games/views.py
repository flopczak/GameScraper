from rest_framework.pagination import LimitOffsetPagination
from rest_framework import viewsets, generics
from games.models import GamesModel, HistoryModel
from games.serializers import GameSerializer, PriceSerializer
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



class PriceHistory(viewsets.ModelViewSet,generics.ListAPIView):
    pagination_class = LimitOffsetPagination
    serializer_class = PriceSerializer
    def get_queryset(self):
        game_id = self.request.query_params.get('game_id')
        queryset = HistoryModel.objects.filter(game_id=game_id)
        return queryset
