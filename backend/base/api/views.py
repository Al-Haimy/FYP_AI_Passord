from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from .models import Pattern
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .pswd_auth import predict_module, train_module


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'trained':  True if Pattern.objects.get(userId=user).pattern_count > 9 else False
    }


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print("token", token)

        # Add custom claims
        # token['username'] = user.username
        # token['trained'] = True if Pattern.objects.get(userId=user).pattern_count > 9 else False
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):

    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )
    # MyTokenObtainPairSerializer.get_token


@api_view(['POST'])
def loginView(request):

    print(request.data)
    username = request.data["username"]
    password = request.data["password"]
    pattern = request.data['pattern'].replace(
        "[", "").replace("]", "").split(",")
    pattern = [int(i) for i in pattern]

    user = User.objects.get(username=username)
    if not user or not user.check_password(password):
        return Response("Error Wrong Creditentials")
    trained = True if Pattern.objects.get(
        userId=user).pattern_count > 9 else False
    jwt_token = get_tokens_for_user(user)
    if not trained:
        message = {
            "type": 1,
            "body": jwt_token
        }
    else:
        user2 = predict_module(pattern)
        if user.id == user2[0]:

            message = {
                "type": 2,
                "body": jwt_token
            }
        else:
            message = {
                "type": 3,
                "body": "Authentication Error"
            }

    return Response(message)


@api_view(['POST'])
def register_func(request):

    username = request.data["username"]
    password = request.data["password"]
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]

    try:
        new_account = User.objects.create_user(first_name=first_name,last_name=last_name,
            username=username, password=password)
        new_account.save()

        pattern = Pattern.objects.create(userId=new_account, pattern_count=1)

        jwt_token = get_tokens_for_user(new_account)

        print(jwt_token)
        message = {
            "type": 1,
            "body": jwt_token
        }
        return Response(message)
    except Exception as e:
        message = {
            "type": 2,
            "body": f"{e}"
        }
        return Response(message)


# decoration for authentication jwt simple


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    full_name ={"name" : request.user.first_name + " " + request.user.last_name
    }
    return Response(full_name)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_pattern(request):
    print(request.user)
    message = {}
    try:

        if not (request.user.check_password(request.data['password'])):
            message = {
                "type": 3,
                "body" : "wrong password"
            }
            return Response(message)

        pattern = request.data["pattern"]
        pattern = request.data['pattern'].replace(
            "[", "").replace("]", "").split(",")
        pattern = [int(i) for i in pattern]
        train_module(request.user.id, pattern)

        pattern_obj = Pattern.objects.filter(userId=request.user).first()
        pattern_obj.pattern_count += 1
        pattern_obj.save()
        if pattern_obj.pattern_count > 9:
            message = {
                "type": 1,
                "body": get_tokens_for_user(request.user)
            }
        else:
            message ={ 
                "type": 2,
                "body": "success Updating AI"
            }

        return Response(message)
    except Exception as e:
        print(e)
    return Response("OK")
