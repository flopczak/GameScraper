import scrapy
from scraper.items import GamesItem
from scrp.models import GamesModel

class PS4Spider(scrapy.Spider):
    name = "ps4"
    start_urls = [
        'https://store.playstation.com/pl-pl/grid/STORE-MSF75508-PS4CAT'
    ]
    def parse(self, response):
        for post in response.css('div.grid-cell--game'):
            title = post.css('div.grid-cell__title span::text')[0].get()
            price = post.css('h3::text').get(),
            console = post.css('div.grid-cell__left-detail--detail-1::text').get()
            img = post.css('.product-image__img img::attr(src)')[1].extract()
            link = 'https://store.playstation.com' + post.css('a.internal-app-link::attr(href)').get()
            if type(price[0]) == str:
                price = price[0].replace(' zl', '').replace(',', '.')
                if price == 'Bezpłatne':
                    price = 0
                else:
                    price = float(price)
            else:
                price = 00.00
            try:
                item = GamesModel.objects.get(link=link)
                GamesModel.objects.filter(link=link).update(price=price)
                print("game exists")
            except GamesModel.DoesNotExist:
                item = GamesItem()
                item['title'] = title
                item['price'] = price
                item['console'] = console
                item['img'] = img
                item['link'] = link
                yield item
        next_page = response.css('.grid-footer-controls a.paginator-control__next::attr(href)').get()
        print(next_page)
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)