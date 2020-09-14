import scrapy
# from selenium import webdriver
from scrapy_splash import SplashRequest

class XboxSpider(scrapy.Spider):
    name = "xbox"
    start_urls = [
        'https://store.nintendo.co.uk/games/nintendo-switch/view-all.list'
    ]
    user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1"
    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url=url,
                    callback=self.parse,
                    endpoint='render.html',
                    args={'wait': 20})

    def parse(self, response):
        for post in response.css('div.productBlock'):
            yield {
                'title': post.css('h3.c-subheading-4::text').get(),
                'price': post.css('.c-price s span.textpricenew::text').get(),
                'console': 'XboxOne',
                'img': post.css('picture.containterIMG img.c-image::attr(src)').extract(),
                'link': post.css('a.gameDivLink::attr(href)').get()
            }
        # next_page = response.css('.grid-footer-controls a.paginator-control__next::attr(href)').get()
        # print(next_page)
        # if next_page is not None:
        #     next_page = response.urljoin(next_page)
        #     yield scrapy.Request(next_page, callback=self.parse)