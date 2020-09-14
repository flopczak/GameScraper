import scrapy

class PostSpider(scrapy.Spider):
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
            else:
                price = "Brak możliwości kupna"
            yield {
                'title': title,
                'price': price,
                'console': console,
                'img': img,
                'link': link
            }
        next_page = response.css('.grid-footer-controls a.paginator-control__next::attr(href)').get()
        print(next_page)
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)