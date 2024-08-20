
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/',include('accounts.urls') ),
    path('api-auth/',include('rest_framework.urls') ),
    path('api/realtors/',include(('realtors.urls'))),
    path('social',include('social.urls')),
    path('api/listings/',include('listing.urls')),
    path('api/chat/',include('chat.urls')),
    path('api/contact/',include('contact.urls')),
    path('api-token/',TokenObtainPairView.as_view(),name="token_obtain_pair" ),
    path('api-token/refresh/',TokenRefreshView.as_view(),name="token_refresh" ),
] 

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

