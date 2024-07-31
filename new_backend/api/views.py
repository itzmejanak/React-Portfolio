from rest_framework import generics
from .models import Stack, Project
from .serializers import StackSerializer, ProjectSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
