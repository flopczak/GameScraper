from scrapy_djangoitem import DjangoItem
from games.models import GamesModel

class GamesItem(DjangoItem):
    django_model = GamesModel