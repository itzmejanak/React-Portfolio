from django.db import models

class Stack(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=255, blank=True, null=True)  # This could be a URL or a class name for the icon
    icon_color = models.CharField(max_length=20, blank=True, null=True)  # Optional color attribute

    def __str__(self):
        return self.name

class Project(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    image = models.URLField(max_length=2000)
    category = models.CharField(max_length=100)
    description = models.TextField()
    demo_link = models.URLField(max_length=2000)
    stack = models.ManyToManyField(Stack, related_name='projects')

    def __str__(self):
        return self.title
