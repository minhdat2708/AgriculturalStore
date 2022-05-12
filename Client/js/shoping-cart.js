let table = document.getElementById('table');

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
    let userId = JSON.parse(localStorage.getItem('userData')).id;
    const url = 'https://localhost/agricultural-products-store/public/api/v1/users/' + userId + '/carts';

    let response = await fetch(url, init);
    if (response.status === 200) {
        let responseJson = await response.json();
        let data = await responseJson.data;
        table.innerHTML = '';
        data.forEach(element => {
            createProductsCart(element);
        });

        var proQty = $('.pro-qty');
        proQty.on('click', '.qtybtn', function () {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });
    }
}

function createProductsCart(data) {
    table.innerHTML = table.innerHTML + '<tr>' +
        '<td class="shoping__cart__item">' +
        '<img src="img/cart/cart-1.jpg" alt="">' +
        '<h5>' + data.name + '</h5>' +
        '</td>' +
        '<td class="shoping__cart__price">' +
        '$' + data.price +
        '</td>' +
        '<td class="shoping__cart__quantity">' +
        '<div class="quantity">' +
        '<div class="pro-qty"><span class="dec qtybtn">-</span>' +
        '<input type="text" value="' + data.quantity + '">' +
        '<span class="inc qtybtn">+</span></div>' +
        '</div>' +
        '</td>' +
        '<td class="shoping__cart__total">' +
        '$' + data.price * data.quantity +
        '</td>' +
        '<td class="shoping__cart__item__close">' +
        '<span class="icon_close"></span>' +
        '</td>' +
        '</tr>'

}

loadProductsCart();