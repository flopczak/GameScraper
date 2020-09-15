from apscheduler.schedulers.blocking import BlockingScheduler
import os

def app():
    os.system("venv\Scripts\activate & cd mysite & python manage.py crawl")

scheduler = BlockingScheduler()
scheduler.add_job(app, 'interval', hours=1)
scheduler.start()

