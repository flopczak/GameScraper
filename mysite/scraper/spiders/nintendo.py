import scrapy
from scrapy_splash import SplashRequest
from currency_converter import CurrencyConverter

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
            yield {
                'title': title,
                'price': price,
                'console': console,
                'img': img,
                'link': link
            }
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
