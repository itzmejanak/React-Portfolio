from django.contrib import admin
from .models import Project, Stack

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'description', 'demo_link')
    search_fields = ('title', 'description')
    filter_horizontal = ('stack',)  # Allows for multiple stack selections

@admin.register(Stack)
class StackAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'icon_color')
    search_fields = ('name',)
