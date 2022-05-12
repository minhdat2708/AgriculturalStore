let product;

function check() {
    let array = window.location.href.split('?');
    if (array.length > 1) {
        let productId = array[1].split('=')[1];
        loadProduct(productId);
    }
}

async function loadProduct(productId) {
    const init = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    const url = 'https://localhost/agricultural-products-store/public/api/v1/products/' + productId;

    let response = await fetch(url, init);
    if (response.status === 200) {
        let responseJson = await response.json();
        product = await responseJson.data;
        createProductDetail();
    }
}

function createProductDetail() {
    document.getElementById('product-name').innerHTML = product.name;
    document.getElementById('product-price').innerHTML = '$' + product.price;
    document.getElementById('unit').innerHTML = '1 ' + product.productUnit;
    document.getElementById('max-quantity').innerHTML = product.quantity + ' ' + product.productUnit;
    document.getElementById('image').src = product.image;
}

function addToCart() {
    let quantity = parseInt(document.getElementById('quantity').value);
    if (quantity > product.quantity) {
        return;
    }

    if (localStorage.getItem('userData') === null) {
        window.location.href = 'login.html';
    }

    addProductCart(quantity);
}

async function addProductCart(quantity) {
    const init = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
            "quantity": quantity
        })
    };

    let userId = JSON.parse(localStorage.getItem('userData')).id;
    const url = 'https://localhost/agricultural-products-store/public/api/v1/users/' + userId + '/carts/' + product.id;

    let response = await fetch(url, init);
    if (response.status === 200) {

    }
}

document.getElementById('add-to-cart').addEventListener('click', addToCart);
check();