from django.contrib import admin
from django import forms
from django.utils.text import slugify
import uuid
from django.http import HttpResponseRedirect
from .models import RentListing, SaleListing

class BaseListingAdminForm(forms.ModelForm):
    class Meta:
        fields = '__all__'

    def save(self, commit=True):
        instance = super().save(commit=False)
        if not instance.slug:
            instance.slug = slugify(instance.title + "-" + str(uuid.uuid4())[:8])
        if commit:
            instance.save()
        return instance


class BaseListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
    list_display_links = ('id', 'title')
    list_filter = ('realtor',)
    list_editable = ('is_published',)
    search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
    list_per_page = 25

    def save_model(self, request, obj, form, change):
        if not obj.slug:
            obj.slug = slugify(obj.title + "-" + str(uuid.uuid4())[:8])

        try:
            initial_obj = self.model.objects.get(pk=obj.pk) if change else None
            obj.save()
            if change:
                if initial_obj and (initial_obj.__dict__ != obj.__dict__):
                    self.message_user(request, f'Updated {obj.title} successfully.', level='success')
                else:
                    self.message_user(request, 'No changes were made.', level='info')
            else:
                self.message_user(request, f'Updated {obj.title} successfully.', level='success')
        except Exception as e:
            self.message_user(request, f'Error: {str(e)}', level='error')

    def response_change(self, request, obj):
        return HttpResponseRedirect('.')

    def response_add(self, request, obj, post_url_continue=None):
        return HttpResponseRedirect('.')


class RentListingAdminForm(BaseListingAdminForm):
    class Meta(BaseListingAdminForm.Meta):
        model = RentListing


class SaleListingAdminForm(BaseListingAdminForm):
    class Meta(BaseListingAdminForm.Meta):
        model = SaleListing


class RentListingAdmin(BaseListingAdmin):
    form = RentListingAdminForm


class SaleListingAdmin(BaseListingAdmin):
    form = SaleListingAdminForm


admin.site.register(RentListing, RentListingAdmin)
admin.site.register(SaleListing, SaleListingAdmin)
