from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator







# class RegisterSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True,
#         validators = [UniqueValidator(queryset=User.objects.all())]
#     )
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = Userfields = ('username', 'password', 'password2', 'email')

#         def validate(self, attrs):
#             if attrs['password'] != attrs['password2']:
#                 raise serializers.ValidationError({"password": "password fields didn't match."})
#             return attrs
#         def create(self, attrs):
#             user = User.objects.create(
#                 username=validated_data['username'],
#                 email=validated_data['email'],
                
#             )
#             user.set_password(validated_ddata['password'])
#             user.save()

#             return user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'pass_count')
        extra_kwargs = {'password': {'write_only': True},
                        'pass_count':{'required':False}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user