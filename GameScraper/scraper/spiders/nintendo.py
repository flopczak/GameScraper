import datetime

import scrapy
from scrapy_splash import SplashRequest
from currency_converter import CurrencyConverter
from games.models import GamesModel, HistoryModel, GamesChanged


class NintendoSpider(scrapy.Spider):
    c = CurrencyConverter()
    name = "nintendo"

    start_urls = [
        'https://store.nintendo.co.uk/games/nintendo-switch/view-all.list'
    ]
    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url=url,
                    callback=self.parse,
                    endpoint='render.html',
                    args={'wait': 0.5})
    
    def parse(self, response):
        last_page = response.css('a.responsivePaginationButton--last::text').get()
        last_page = int(last_page)

        for post in response.css('div.productBlock'):
            title = post.css('h3.productBlock_productName::text').get().replace('\n','')
            price = post.css('div.productBlock_price span.productBlock_priceValue::text').get()
            console = 'Nintendo Switch'
            img = post.css('div.productBlock_imageContainer img::attr(src)')[0].extract()
            link = "https://store.nintendo.co.uk/" + post.css('a.productBlock_link::attr(href)').get()
            if not price:
                price = post.css('div.productBlock_from span.productBlock_fromValue::text').get()
            price = price.replace('£','')
            price = round(self.c.convert(price,'GBP','PLN'))
            try:
                item = GamesModel.objects.get(link=link)
                history = HistoryModel()
                games_updated = GamesChanged()
                setattr(history, 'game_id', item)
                setattr(history, 'title', getattr(item, 'title'))
                setattr(history, 'price', getattr(item, 'price'))
                setattr(history, 'date', getattr(item, 'date'))
                history.save()
                if getattr(item, 'price') > price:
                    setattr(games_updated, 'game_id', item)
                    games_updated.save()
                GamesModel.objects.filter(link=link).update(price=price, date=datetime.now)
            except GamesModel.DoesNotExist:
                item = GamesModel()
                setattr(item, 'title', title)
                setattr(item, 'price', price)
                setattr(item, 'console', console)
                setattr(item, 'img', img)
                setattr(item, 'link', link)
                item.save()
        page = 2
        next_p = True
        while next_p:
            if page < last_page:
                next_page = '?pageNumber=' + str(page)
                if next_page is not None:
                    next_page = response.urljoin(next_page)
                    yield scrapy.Request(next_page, callback=self.parse)
                    page += 1
            else:
                next_p = False
