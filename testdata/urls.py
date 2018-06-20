from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^standards$', views.get_standards, name='standards'),
    url(r'^grades$', views.get_grades, name='grades'),
    url(r'^learning_domains$', views.get_learning_domains, name='learning_domains'),
    url(r'^full_codes$', views.get_full_codes, name='full_codes'),
    url(r'^descriptions$', views.get_descriptions, name='descriptions'),
]