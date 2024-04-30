from rest_framework import routers
from .views import NewViewSet, CategoryViewSet, UserViewSet

router = routers.SimpleRouter()
router.register(r'news', NewViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls
