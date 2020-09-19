from rest_framework import routers
from .api import AccountViewSet
from games import views
from django.urls import path


router = routers.DefaultRouter()
router.register('api/accounts', AccountViewSet, 'accounts' )
router.register('api/games', views.GamesViewSet,'games')
router.register('api/price', views.PriceHistory,'price')
router.register('api/game_info', views.GameRequest,'game_price_info')
router.register('api/acc_games', views.AccountGamesRequest,'acc_games')

urlpatterns = router.urls