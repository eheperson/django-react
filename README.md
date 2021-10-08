#  django-react test project

<dl>
  <dt>django-cors-headers</dt>
  <dd>It is a Python library that will prevent the errors that you would normally get due to CORS rules.</dd>
  <dd>In the CORS_ORIGIN_WHITELIST code, you whitelisted localhost:3000 because you want the frontend (which will be served on that port of the application to interact with the API.</dd>

  <dt>Serializers</dt>
  <dd>You will need serializers to convert model instances to JSON so that the frontend can work with the received data.</dd>
  
  <dt>from rest_framework import viewsets</dt>
  <dd>The viewsets base class provides the implementation for CRUD operations by default. This code specifies the serializer_class and the queryset.</dd>

  <dt> axios </dt>
  <dd> To make requests to the API endpoints on the backend server, you will install a JavaScript library called axios. </dd>
</dl>

# Setting Up the Django-Backend and API

```
mkdir django-react
cd django-react
```

```
touch .gitignore
```

```
echo "/venv/" >> .gitignore
echo "/.DS_Store/" >> .gitignore
```

```
python3 -m venv venv
source venv/bin/activate
```

```
pip install django
pip install djangorestframework
pip install django-cors-headers
```

```
django-admin startproject backend
cd backend
python manage.py startapp todoapp
touch todoapp/serializers.py

python manage.py createsuperuser
```

```
# to check the django baceknd is working

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

> Do not forget to add 'todoapp' to the backend/settings.py of the backend

> You need to add rest_framework and corsheaders to the list of installed applications.
> Open the backend/settings.py file in your code editor and update the INSTALLED_APPS and MIDDLEWARE sections:
>
```
INSTALLED_APPS = [
    ...
    'corsheaders',
    'rest_framework',
    'todo',
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
]
```

> Then, add these lines of code to the bottom of the backend/settings.py file:

```
CORS_ORIGIN_WHITELIST = [
     'http://localhost:3000'
]
```

### Edit todoapp

```
# todoapp/model.py
# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

```

```
# todoapp/serializers.py
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')
```

```
# todoapp/views.py
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
```

```
# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

```
python manage.py makemigrations todoapp
python manage.py migrate todoapp
```

# Setting Up the React-Frontend

```
# Create and test the react app
# under the django-react directory 
npx create-react-app frontend

cd frontend

npm start
```

```
# install dependencies for react-frontend
# bootstrap and reactstrap to provide user interface tools.
npm install bootstra reactstrap --legacy-peer-deps
npm install axios
```

```
mkdir src/components
touch src/components/Modal.js
```

> Then open the frontend/package.json file in your code editor and add a proxy:

```
...
"proxy": "http://localhost:8000",
...
```

> 'frontend/src/App.js', 'frontend/src/index.js' and 'frontend/src/components/Modal.js' files are edited and saved as .old files.

# To run project

```
# open the terminal
cd django-docker/frontend
npm start

#open another terminal
cd django-docker/backend

source ../venv/bin/activate
python manage.py runserver
```