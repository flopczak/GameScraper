from apscheduler.schedulers.blocking import BlockingScheduler
from django.core.management import call_command
from datetime import datetime
from django.core.management.base import BaseCommand
from scrapy.core.scheduler import Scheduler


class Command(BaseCommand):
    help = "Release the spiders"


    def handle(self, *args, **options):
        scheduler = BlockingScheduler()
        scheduler.add_job(call_command('runcom'), 'interval', hours=24)
        scheduler.start()
