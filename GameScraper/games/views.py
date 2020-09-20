from django.http import JsonResponse, Http404
from requests import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import viewsets, generics, views, status
from games.models import GamesModel, HistoryModel, AccountGames
from games.serializers import GameSerializer, PriceSerializer, AccountGamesSerializer
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

class GameRequest(viewsets.ModelViewSet,views.APIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        id = self.request.query_params.get('id')
        queryset = GamesModel.objects.filter(id=id)
        return queryset

class AccountGamesRequest(viewsets.ModelViewSet,generics.ListAPIView):
    serializer_class = AccountGamesSerializer
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return AccountGames.objects.get(game_id=pk,account_id=self.request.user)
        except AccountGames.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        serializer = AccountGamesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        id = self.request.user
        queryset = AccountGames.objects.filter(account_id=id)
        return queryset

class AccountGamesDel(viewsets.ModelViewSet,generics.ListAPIView):
    serializer_class = AccountGamesSerializer
    def get_queryset(self,pk):
        queryset = AccountGames.objects.filter(game_id=pk,account_id=id)
        return queryset

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return AccountGames.objects.get(game_id=pk,account_id=self.request.user)
        except AccountGames.DoesNotExist:
            raise Http404

    def delete(self, request):
        queryset = self.get_object().delete()
        return queryset

