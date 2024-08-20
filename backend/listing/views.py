from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import RentListing
from .serializers import ListingRentSerializer,ListingRentDetailSerializer
from datetime import datetime, timezone, timedelta
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import SaleListing
from .serializers import SaleListingSerializer,SaleListingDetailSerializer
from datetime import datetime, timezone, timedelta
from rest_framework.authentication import TokenAuthentication
from django.http import Http404
from django.shortcuts import get_object_or_404

# Listing and Listings is different
class ListingRentsView(ListAPIView):
    permission_classes = [AllowAny]
    #  the listing will show latest at the top and publishing is true
    queryset = RentListing.objects.order_by('-list_date').filter(is_published=True)
    # the listing can be seen by anyone
    # it will show specific data not all data
    serializer_class = ListingRentSerializer
    lookup_field  = 'slug'


class ListingDetailView(APIView):
    def get(self, request, slug, *args, **kwargs):
        # Try to get a SaleListing first
        try:
            sale_listing = SaleListing.objects.get(slug=slug, is_published=True)
            serializer = SaleListingDetailSerializer(sale_listing, context={'request': request})
            return Response(serializer.data)
        except SaleListing.DoesNotExist:
            # If not found, try to get a RentListing
            try:
                rent_listing = RentListing.objects.get(slug=slug, is_published=True)
                serializer = ListingRentDetailSerializer(rent_listing, context={'request': request})
                return Response(serializer.data)
            except RentListing.DoesNotExist:
                # If neither found, return a 404 error
                raise Http404("Listing not found")

            
            
# anyone can search
class RentSearchView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ListingRentSerializer

    def post(self, request, format=None):
        queryset = RentListing.objects.order_by('-list_date').filter(is_published=True)
        data = self.request.data

        price = data['price']
        if price == '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1
        
        if price != -1:
            queryset = queryset.filter(price__gte=price)
        
        bedrooms = data['bedrooms']
        if bedrooms == '0+':
            bedrooms = 0
        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5
        
        queryset = queryset.filter(bedrooms__gte=bedrooms)

        sqrft = data['sqrft']
        if sqrft == '1000+':
            sqrft = 1000
        elif sqrft == '1200+':
            sqrft = 1200
        elif sqrft == '1500+':
            sqrft = 1500
        elif sqrft == '2000+':
            sqrft = 2000
        elif sqrft == 'Any':
            sqrft = 0
        
        if sqrft != 0:
            queryset = queryset.filter(sqrft__gte=sqrft)
        
        days_passed = data['days']
        if days_passed == '1':
            days_passed = 1
        elif days_passed == '3':
            days_passed = 2
        elif days_passed == '7':
            days_passed = 7
        elif days_passed == '12+':
            days_passed = 13
        
        for query in queryset:
            num_days = (datetime.now(timezone.utc) - query.list_date).days

            if days_passed != 0:
                if num_days > days_passed:
                    slug=query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
                    
                    
        serializer = ListingRentSerializer(queryset, many=True)

        return Response(serializer.data)


# Listing and Listings is different
class SaleListingsView(ListAPIView):
    permission_classes = [AllowAny]
    #  the listing will show latest at the top and publishing is true
    queryset = SaleListing.objects.order_by('-list_date').filter(is_published=True)
    # the listing can be seen by anyone
    # it will show specific data not all data
    serializer_class = SaleListingSerializer
    lookup_field  = 'slug'



# anyone can search
class SaleSearchView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SaleListingSerializer

    def post(self, request, format=None):
        queryset = SaleListing.objects.order_by('-list_date').filter(is_published=True)
        data = self.request.data

        price = data['price']
        if price == '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1
        
        if price != -1:
            queryset = queryset.filter(price__gte=price)
        
        bedrooms = data['bedrooms']
        if bedrooms == '0+':
            bedrooms = 0
        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5
        
        queryset = queryset.filter(bedrooms__gte=bedrooms)

        bathrooms = data['bathrooms']
        if bathrooms == '0+':
            bathrooms = 0
        elif bathrooms == '1+':
            bathrooms = 1
        elif bathrooms == '2+':
            bathrooms = 2
        elif bathrooms == '3+':
            bathrooms = 3
        elif bathrooms == '4+':
            bathrooms = 4
        
        queryset = queryset.filter(bathrooms__gte=bathrooms)

        sqrft = data['sqrft']
        if sqrft == '1000+':
            sqrft = 1000
        elif sqrft == '1200+':
            sqrft = 1200
        elif sqrft == '1500+':
            sqrft = 1500
        elif sqrft == '2000+':
            sqrft = 2000
        elif sqrft == 'Any':
            sqrft = 0
        
        if sqrft != 0:
            queryset = queryset.filter(sqrft__gte=sqrft)
        
        days_passed = data['days']
        if days_passed == '1':
            days_passed = 1
        elif days_passed == '3':
            days_passed = 2
        elif days_passed == '7':
            days_passed = 7
        elif days_passed == '12+':
            days_passed = 13
        
        for query in queryset:
            num_days = (datetime.now(timezone.utc) - query.list_date).days

            if days_passed != 0:
                if num_days > days_passed:
                    slug=query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
        
        
        serializer = SaleListingSerializer(queryset, many=True)

        return Response(serializer.data)