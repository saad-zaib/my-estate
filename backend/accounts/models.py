from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator


# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, tc,address, phone_number, city, nic, nic_front, nic_back ,user_image,  password=None):
        """
        Creates and saves a User with the given email, name, tc, and password.
        """
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            nic_front=nic_front,
            name=name,
            tc=tc,
            address=address,
            phone_number=phone_number,
            nic_back=nic_back,
            city=city,
            nic=nic,
            user_image=user_image
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, tc, address='Default Address', phone_number='0000000000', nic='0000000000000', city='Default City', nic_front='nic_front.png', nic_back='/nic_back.png',user_image="/userimage.png", password=None):
        """
        Creates and saves a superuser with the given email, name, tc, address, phone_number, city, nic_front, nic_back, and password.
        """
        user = self.create_user(
            email,
            name=name,
            tc=tc,
            address=address,
            phone_number=phone_number,
            city=city,
            nic=nic,
            nic_front=nic_front,
            nic_back=nic_back,
            user_image=user_image,
            password=password,
        )
        user.is_active = True
        user.is_admin = True
        is_realtor = False
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


# Custom User Model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    tc = models.BooleanField()
    phone_number = models.CharField(
        max_length=11,
        validators=[
            RegexValidator(
                regex=r'^0\d{10}$',
                message='Phone number must be 11 digits and start with 0',
                code='invalid_phone_number'
            )
        ]
    )

    nic = models.CharField(
    max_length=13,
    validators=[
        RegexValidator(
            regex=r'^\d{13}$',
            message='NIC must be exactly 13 digits',
            code='invalid_nic'
        )
    ]
)
    nic_front = models.ImageField(upload_to='nic_front/')
    nic_back = models.ImageField(upload_to='nic_back/')
    user_image = models.ImageField(null=True,blank=True, upload_to='userimage/')
    city = models.CharField(max_length=100 )
    address = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)
    is_realtor = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True


