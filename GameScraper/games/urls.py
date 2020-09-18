from rest_framework import routers
from .api import AccountViewSet
from games import views
from django.urls import path


router = routers.DefaultRouter()
router.register('api/accounts', AccountViewSet, 'accounts' )
router.register('api/games', views.GamesViewSet,'games')
router.register('api/price', views.PriceHistory,'price')

urlpatterns = router.urls