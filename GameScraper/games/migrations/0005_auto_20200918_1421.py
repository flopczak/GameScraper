# Generated by Django 3.1.1 on 2020-09-18 12:21

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_auto_20200917_1718'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamesmodel',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='historymodel',
            name='game_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.gamesmodel'),
        ),
        migrations.CreateModel(
            name='AccountGames',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.account')),
                ('game_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.gamesmodel')),
            ],
        ),
    ]