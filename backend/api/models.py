from django.db import models
from django.contrib.auth.models import AbstractUser


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class User(AbstractUser):
    categories = models.ManyToManyField(Category, related_name='user', blank=True, db_table='user_category')

    def __str__(self):
        return self.username


class New(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    body = models.TextField()
    image = models.ImageField(upload_to='images', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='new')

    def __str__(self):
        return f"{self.id} -- {self.title} -- {self.category}"
