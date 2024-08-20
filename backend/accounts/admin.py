from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('id','email', 'name', 'phone_number', 'city', 'is_active', 'is_admin', 'created_at')
    list_filter = ('is_active', 'is_admin')
    search_fields = ('email', 'name')
    readonly_fields = ('created_at', 'updated_at')  # Set fields as readonly
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'phone_number', 'city', 'address', 'nic', 'nic_front', 'nic_back','user_image')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_admin','tc','is_realtor')}),
        ('Important dates', {'fields': ('created_at', 'updated_at',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'tc', 'phone_number', 'address', 'city', 'nic', 'nic_front', 'nic_back', 'password1', 'password2'),
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return self.readonly_fields + ('created_at',)
        return self.readonly_fields

admin.site.register(User, UserAdmin)
