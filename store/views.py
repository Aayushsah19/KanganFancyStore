from django.shortcuts import render

def home(request):
    # Ye logic automatic 22 items ki list bana dega
    products = []
    for i in range(1, 23):  # 1 se 22 tak chalega
        item = {
            'id': i,
            'name': f'Fancy Kangan Design #{i}',
            'price': 1000 + (i * 150),  # Har item ka price thoda alag dikhega
            'image': f'item{i}.jpeg'     # Ye aapki photo ka naam dhoondega
        }
        products.append(item)
    
    context = {
        'items': products,
        'store_name': 'Kangan Fancy Store',
        'location': 'Siraha, Nepal'
    }
    return render(request, 'index.html', context)
