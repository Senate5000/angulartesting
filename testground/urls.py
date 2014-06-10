from django.conf.urls import *

urlpatterns = patterns('',
    (r'test', 'testground.views.testView'),
    (r'sf4', 'testground.views.SF4'),

)
