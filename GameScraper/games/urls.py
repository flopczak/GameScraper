from rest_framework import routers
from .api import AccountViewSet


router = routers.DefaultRouter()
router.register('api/accounts', AccountViewSet, 'accounts' )

urlpatterns = router.urls