from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)
from . import views


urlpatterns = [
    path('', views.getRoutes),
    path('token/', loginView, name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('register/', RegisterView.as_view(), name='auth_register'),
     path('add_pattern/', add_pattern, name='add_pattern'),
     path('register2/', register_func, name='register_func'),
     path('user/', user_view, name='user_view'),
]
# urlpatterns = [
#     path('', views.getRoutes),
#     path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#      path('register/', RegisterView.as_view(), name='auth_register'),
#      path('register2/', register_func, name='register_func'),
# ]