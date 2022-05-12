let table = document.getElementById('table');
let userData1 = JSON.parse(localStorage.getItem('userData'));
let ulTagList = document.getElementById('products');
let products = [];

async function loadProductsCart() {
    const init = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };
    let userId = userData1.id;
    const url = 'https://localhost/agricultural-products-store/public/api/v1/users/' + userId + '/carts';

    let response = await fetch(url, init);
    if (response.status === 200) {
        let responseJson = await response.json();
        products = await responseJson.data;
        ulTagList.innerHTML = '';
        products.forEach(element => {
            createProductsCartList(element);
        });
    }
    updateTotal();
}

function createProductsCartList(data) {
    ulTagList.innerHTML += '<li>' + data.name + '<span>$' + data.price * data.quantity + '</span></li>'
}

function updateTotal() {
    let total = 0;
    products.forEach(element => {
        total += element.price * element.quantity;
    });
    document.getElementById('total').innerHTML = '$' + total;
    document.getElementById('subtotal').innerHTML = '$' + total;
}

async function checkout() {
    let productIds = [];
    products.forEach(element => {
        productIds.push(element.id);
    });

    const init = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
            "product_ids": productIds
        })
    };

    let userId = userData1.id;
    const url = 'https://localhost/agricultural-products-store/public/api/v1/users/' + userId + '/checkout';

    let response = await fetch(url, init);
    if (response.status === 200) {
        alertSuccess();
    }
    if (response.status === 409) {
        let responseJson = await response.json();
        alertError(responseJson.errors[0])
    }
    if (response.status === 500 || response.status === 509) {
        alertError('Something went wrong! Please try again later.');
    }
}

function alertSuccess() {
    Swal.fire({
        title: '<strong>Thank you!</strong>',
        icon: 'success',
        text: 'You ordered successfully!',
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-check"></i> Continue shoping',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html'
        }
    })
}

function alertError(message) {
    Swal.fire({
        title: '<strong>Oops...</strong>',
        icon: 'error',
        text: message,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-brake-warning"></i> Go back to cart',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        confirmButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'shoping-cart.html'
        }
    })
}

loadProductsCart();
document.getElementById('status').addEventListener('click', checkout);