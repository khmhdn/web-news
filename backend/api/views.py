from rest_framework import viewsets
from django_filters.rest_framework import FilterSet
from django.contrib.auth import get_user_model
from . import models, serializers


class UserFilter(FilterSet):
    class Meta:
        model = get_user_model()
        exclude = ['username']


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UsersSerializer
    filterset_class = UserFilter


class NewViewSet(viewsets.ModelViewSet):
    queryset = models.New.objects.order_by('-views').all()
    serializer_class = serializers.NewSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.New.objects.all()
    serializer_class = serializers.CategorySerializer
    filterset_fields = ['id', 'category__id']
