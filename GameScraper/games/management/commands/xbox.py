import datetime

from django.core.management.base import BaseCommand
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from games.models import GamesModel, HistoryModel, GamesChanged



class Command(BaseCommand):
    help = "Release the spiders"

    def handle(self, *args, **options):
        url = 'https://www.xbox.com/pl-PL/games/all-games'
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        driver = webdriver.Chrome(executable_path=r'C:\Users\Bartek\Desktop\chromedriver_win32\chromedriver.exe', chrome_options=chrome_options)

        driver.get(url)
        element = WebDriverWait(driver, 15).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "gameDiv"))
        )
        while True:
            games = driver.find_elements_by_class_name("gameDivLink")
            i = 0
            for game in games:
                i += 1
                title = game.find_element_by_class_name('x1GameName').get_attribute('innerHTML')
                try:
                    price = game.find_element_by_class_name('c-price').find_element_by_class_name(
                        'textpricenew').get_attribute('innerHTML')
                except:
                    price = 0
                if isinstance(price,str):
                    price = price.replace('&nbsp;zł', '').replace(',', '.')
                price = float(price)
                console = 'XboxOne'
                img = game.find_element_by_class_name('c-image').get_attribute('src')
                link = game.get_attribute('href')
                try:
                    item = GamesModel.objects.get(link=link)
                    history = HistoryModel()
                    games_updated = GamesChanged()
                    setattr(history, 'game_id', item)
                    setattr(history, 'title', getattr(item, 'title'))
                    setattr(history, 'price', getattr(item, 'price'))
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
            try:
                driver.find_element_by_class_name("paginatenext").click()
            except:
                break
            WebDriverWait(driver, 2).until(
                EC.visibility_of_element_located((By.CLASS_NAME, "gameDiv"))
            )