let ulTag = document.getElementsByClassName('hero__categories')[0].childNodes[3];
let ulTag2 = document.getElementById('categories');

function check() {
    let array = window.location.href.split('?');
    if (array.length > 1) {
        let categoryId = array[1].split('=')[1];
        loadProducts(categoryId);
    } else {
        loadProducts(-1);
    }
}

async function getCategories() {
    const init = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    const url = 'https://localhost/agricultural-products-store/public/api/v1/categories';

    let response = await fetch(url, init);
    if (response.status === 200) {
        let responseJson = await response.json();
        let data = await responseJson.data;
        createCategories(data);
    }
}

function createCategories(data) {
    data.forEach(element => {
        ulTag.appendChild(createLi(element, true));
        if (ulTag2 !== null) {
            ulTag2.appendChild(createLi(element, false));
        }
    });
}

function createLi(data, isReload) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    if (isReload) {
        a.href = 'shop-grid.html?category_id=' + data.id;
    } else {
        a.href = '#';
        a.addEventListener('click', async (e) => {
            loadProducts(e.target.id);
        })
    }
    a.innerHTML = data.name;
    a.id = data.id;
    li.appendChild(a);
    return li;
}

async function loadProducts(categoryId) {
    const init = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    const url = 'https://localhost/agricultural-products-store/public/api/v1' + (categoryId == -1 ? '' : ('/categories/' + categoryId)) + '/products';

    let response = await fetch(url, init);
    if (response.status === 200) {
        let responseJson = await response.json();
        let data = await responseJson.data;
        document.getElementById('product-found').innerHTML = data.length;
        document.getElementById('products').innerHTML = '';
        data.forEach(element => {
            createProduct(element);
        });
    }
}

function createProduct(product) {
    let div = document.getElementById('products');
    div.innerHTML = div.innerHTML +
        '<div class="col-lg-4 col-md-6 col-sm-6">' +
        '<div class="product__item">' +
        '<div class="product__item__pic set-bg" data-setbg="' + product.previewImage + '" style="background-image: url(&quot;' + product.previewImage + '&quot;);">' +
        '<ul class="product__item__pic__hover">' +
        '<li><a href="shop-details.html?product_id="' + product.id + '><i class="fa fa-heart"></i></a></li>' +
        '<li><a href="shop-details.html?product_id="' + product.id + '"><i class="fa fa-retweet"></i></a></li>' +
        '<li><a href="shop-details.html?product_id="' + product.id + '"><i class="fa fa-shopping-cart"></i></a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="product__item__text">' +
        '<h6><a href="shop-details.html?product_id="' + product.id + '">' + product.name + '</a></h6>' +
        '<h5>$' + product.price + '</h5>' +
        '</div>' +
        '</div>' +
        '</div>'
}

check()
getCategories();