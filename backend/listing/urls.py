from django.urls import path
from .views import  ListingRentsView, RentSearchView
from .views import ListingDetailView, SaleListingsView, SaleSearchView

urlpatterns = [
    path('rent/', ListingRentsView.as_view(), name='rent-listings'),
    path('rent/search/', RentSearchView.as_view(), name='rent-search'),
    path('sale/', SaleListingsView.as_view(), name='sale-listings'),
    path('sale/search/', SaleSearchView.as_view(), name='sale-search'),
    path('<slug>', ListingDetailView.as_view(), name='sale-detail'),
]
