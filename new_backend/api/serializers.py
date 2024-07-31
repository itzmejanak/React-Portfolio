from rest_framework import serializers
from .models import Stack, Project

class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = ['id', 'name', 'icon', 'icon_color']

class ProjectSerializer(serializers.ModelSerializer):
    stack = StackSerializer(many=True, read_only=True)  # Nested serializer for related Stack objects

    class Meta:
        model = Project
        fields = ['id', 'title', 'image', 'category', 'description', 'demo_link', 'stack']
