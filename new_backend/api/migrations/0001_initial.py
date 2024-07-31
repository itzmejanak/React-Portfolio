# Generated by Django 5.0.6 on 2024-07-31 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('icon', models.CharField(max_length=100)),
                ('icon_color', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('image', models.URLField()),
                ('category', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('demo_link', models.URLField()),
                ('stack', models.ManyToManyField(to='api.stack')),
            ],
        ),
    ]
