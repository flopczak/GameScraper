from apscheduler.schedulers.blocking import BlockingScheduler
import os

def app():
    os.system("venv\Scripts\activate & cd GameScraper & python manage.py runcom")

app()

scheduler = BlockingScheduler()
scheduler.add_job(app, trigger='cron', hour='22', minute='30')
scheduler.start()