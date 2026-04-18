import json
from django.http import JsonResponse
from .models import Prompt, Tag
from .redis_client import r


def list_prompts(request):
    tag = request.GET.get('tag')

    if tag:
        prompts = Prompt.objects.filter(tags__name=tag)
    else:
        prompts = Prompt.objects.all()

    data = []
    for p in prompts:
        data.append({
            "id": str(p.id),
            "title": p.title,
            "complexity": p.complexity,
            "tags": [t.name for t in p.tags.all()]
        })

    return JsonResponse(data, safe=False)


def create_prompt(request):
    data = json.loads(request.body)

    prompt = Prompt.objects.create(
        title=data['title'],
        content=data['content'],
        complexity=data['complexity']
    )

    tags = data.get('tags', [])
    for t in tags:
        tag_obj, _ = Tag.objects.get_or_create(name=t)
        prompt.tags.add(tag_obj)

    return JsonResponse({"id": str(prompt.id)})


def get_prompt(request, id):
    p = Prompt.objects.get(id=id)

    key = f"views:{id}"
    r.incr(key)
    views = int(r.get(key) or 0)

    return JsonResponse({
        "id": str(p.id),
        "title": p.title,
        "content": p.content,
        "complexity": p.complexity,
        "tags": [t.name for t in p.tags.all()],
        "view_count": views
    })