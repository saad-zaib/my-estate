from django.contrib import admin
from .models import Realtor

@admin.register(Realtor)
class RealtorAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'phone', 'top_seller', 'date_hired')
    search_fields = ('user__name', 'phone')
    list_filter = ('top_seller', 'date_hired')
    readonly_fields = ('date_hired',)
    fieldsets = (
        (None, {'fields': ('user', 'photo', 'description', 'phone')}),
        ('Advanced options', {'fields': ('top_seller', 'date_hired'), 'classes': ('collapse',)}),
    )
