## Spis treści
* [Podstawowe informacje](# Podstawowe informacje)
* [Jak zainstalować](# Jak zainstalować)
* [Jak uruchomić](# Jak uruchomić)


##Podstawowe informacje
Branch demonstrujący działanie scrapera pobierające dane z PSStore(PL), Nintendo Eshop(UK) i Xbox store(PL)[WIP].
	
## Jak zainstalować
Projekt wykorzystuje następujące technologie:
* Python wersja: 3.7
* Docker Engine wersja: v19.03.12 (minimum v17.XX.XX)
* Splash Docker wersja: 3.5

Biblioteki wykorzystywane przez projekt:
* Scrapy wersja: 2.3.0
* CurrencyConverter wersja: 0.14.2
* scrapy-splash wersja: 0.7.2

Instalacja:
* Instalacja obrazu splash:
```
$ docker pull scrapinghub/splash
```
Uruchomienie kontenera:
```
$ docker run -it -p 8050:8050 --rm scrapinghub/splash
```

* Instalacja bibliotek za pomocą pip:
```
$ pip install Scrapy
$ pip install currencyconverter
$ pip install scrapy-splash
```

	
## Jak uruchomić
Aby przetestować działanie programu należy:
* Aktywować venv:
```
venv\Scripts\activate
```
* Przejść do folderu scraper:
```
cd scraper
```
* Uruchomić wybranego "pająka":
```
scrapy crawl nintendo -o nintendo.json
```
