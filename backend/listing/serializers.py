from rest_framework  import serializers
from .models import RentListing
from .models import SaleListing



class ListingRentSerializer(serializers.ModelSerializer):
    realtor_name = serializers.CharField(source='realtor.user.name', read_only=True)
    realtor_photo = serializers.ImageField(source='realtor.photo', read_only=True)  # Realtor's photo
    realtor_phone = serializers.CharField(source='realtor.phone', read_only=True)  # Realtor's phone

    class Meta:
        model  = RentListing
        fields = [
            'title', 'address', 'city', 'realtor_phone', 'realtor_photo', 'state',
            'realtor_name', 'price', 'bedrooms', 'bathrooms', "garage", 'garden',
            'floor', 'kitchen', 'sqrft', 'open_house', 'photo_main', 'photo_1',
            'slug', 'is_promotion', 'promotion_days','originalPrice','colorHex','color'
        ]
class AbsoluteURLImageField(serializers.ImageField):
    def to_representation(self, value):
        request = self.context.get('request')
        if request and value:
            return request.build_absolute_uri(value.url)
        return super().to_representation(value)

class ListingRentDetailSerializer(serializers.ModelSerializer):
    realtor_name = serializers.CharField(source='realtor.user.name', read_only=True)
    realtor_photo = serializers.ImageField(source='realtor.photo', read_only=True)  # Realtor's photo
    realtor_phone = serializers.CharField(source='realtor.phone', read_only=True)  # Realtor's phone

    class Meta:
        model = RentListing
        fields = '__all__'
        lookup_field = 'slug'

class SaleListingSerializer(serializers.ModelSerializer):
    realtor_name = serializers.CharField(source='realtor.user.name', read_only=True)
    realtor_photo = serializers.ImageField(source='realtor.photo', read_only=True)  # Realtor's photo
    realtor_phone = serializers.CharField(source='realtor.phone', read_only=True)  # Realtor's phone

    class Meta:
        model  = SaleListing
        fields = [
            'title', 'address', 'city', 'realtor_phone', 'realtor_name', 'realtor_photo',
            'state', 'price', 'bedrooms', 'bathrooms', 'sqrft', 'garage', 'open_house',
            'garden', 'kitchen', 'floor', 'photo_main', 'photo_1', 'slug',
            'is_promotion', 'promotion_days','originalPrice','colorHex','color'
        ]

class SaleListingDetailSerializer(serializers.ModelSerializer):
    realtor_name = serializers.CharField(source='realtor.user.name', read_only=True)
    realtor_photo = serializers.ImageField(source='realtor.photo', read_only=True)  # Realtor's photo
    realtor_phone = serializers.CharField(source='realtor.phone', read_only=True)  # Realtor's phone

    class Meta:
        model = SaleListing
        fields = '__all__'
        lookup_field = 'slug'
