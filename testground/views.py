from django.shortcuts import render, render_to_response
from django.template import RequestContext


# Create your views here.

def testView(request):

    return render_to_response("eggheadscratch.html", context_instance=RequestContext(request))
