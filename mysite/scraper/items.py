from scrapy_djangoitem import DjangoItem
from scrp.models import GamesModel

class GamesItem(DjangoItem):
    django_model = GamesModel