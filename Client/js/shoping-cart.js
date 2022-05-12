let table = document.getElementById('table');
let userData1 = JSON.parse(localStorage.getItem('userData'));

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
        let data = await responseJson.data;
        table.innerHTML = '';
        data.forEach(element => {
            createProductsCart(element);
        });

        updateTotal(data);
        bindCloseEventClick();

        var proQty = $('.pro-qty');
        proQty.on('click', '.qtybtn', function (e) {
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
            updateSubTotal(e.target.classList[2])
        });
    }
}

function updateSubTotal(productId) {
    document.getElementsByClassName('shoping__cart__total_' + productId)[0].innerHTML = '$' +
        parseInt(document.getElementsByClassName('input_quantity_' + productId)[0].value) *
        parseFloat(document.getElementsByClassName('shoping__cart__price_' + productId)[0].innerHTML.substring(1));

    document.getElementById('total').innerHTML = '$' +
        (parseInt(document.getElementById('total').innerHTML.substring(1)) +
            parseFloat(document.getElementsByClassName('shoping__cart__price_' + productId)[0].innerHTML.substring(1)));

    document.getElementById('subtotal').innerHTML = '$' +
        (parseInt(document.getElementById('subtotal').innerHTML.substring(1)) +
            parseFloat(document.getElementsByClassName('shoping__cart__price_' + productId)[0].innerHTML.substring(1)));

    preventCheckout();

}

function createProductsCart(data) {
    table.innerHTML = table.innerHTML + '<tr id="tr_' + data.id + '">' +
        '<td class="shoping__cart__item">' +
        '<img src="' + data.previewImage + '" alt="">' +
        '<h5>' + data.name + '</h5>' +
        '</td>' +
        '<td class="shoping__cart__price_' + data.id + '">' +
        '$' + data.price +
        '</td>' +
        '<td class="shoping__cart__quantity_' + data.id + '">' +
        '<div class="quantity">' +
        '<div class="pro-qty"><span class="dec qtybtn ' + data.id + '">-</span>' +
        '<input class="input_quantity_' + data.id + '" type="text" value="' + data.quantity + '">' +
        '<span class="inc qtybtn ' + data.id + '">+</span></div>' +
        '</div>' +
        '</td>' +
        '<td class="shoping__cart__total_' + data.id + '">' +
        '$' + data.price * data.quantity +
        '</td>' +
        '<td class="shoping__cart__item__close">' +
        '<span class="icon_close ' + data.id + '"></span>' +
        '</td>' +
        '</tr>';
}

function bindCloseEventClick() {
    document.querySelectorAll(".icon_close").forEach(item => {
        item.addEventListener("click", (e) => confirmDelete(e));
    })

    function confirmDelete(e) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your product has been removed.',
                    'success'
                )
                removeProductCart(e.target.classList[1])
            }
        })
    }
}

function updateTotal(data) {
    let total = 0;
    data.forEach(element => {
        total += parseFloat(element.price * element.quantity);
    });

    document.getElementById('total').innerHTML = '$' + total;
    document.getElementById('subtotal').innerHTML = '$' + total;
    preventCheckout();

}

async function removeProductCart(productId) {
    const init = {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };
    const url = 'https://localhost/agricultural-products-store/public/api/v1/users/' + userData1.id + '/carts/' + productId;

    let response = await fetch(url, init);
    if (response.status === 200) {

        document.getElementById('total').innerHTML = '$' +
            (parseInt(document.getElementById('total').innerHTML.substring(1)) -
                (parseInt(document.getElementsByClassName('input_quantity_' + productId)[0].value *
                    parseFloat(document.getElementsByClassName('shoping__cart__price_' + productId)[0].innerHTML.substring(1)))));

        document.getElementById('subtotal').innerHTML = '$' +
            (parseInt(document.getElementById('subtotal').innerHTML.substring(1)) -
                (parseInt(document.getElementsByClassName('input_quantity_' + productId)[0].value *
                    parseFloat(document.getElementsByClassName('shoping__cart__price_' + productId)[0].innerHTML.substring(1)))));

        document.getElementById('tr_' + productId).remove();
        preventCheckout();


    }
}

function preventCheckout() {
    if (document.getElementById('total').innerHTML === '$0') {
        document.getElementById('checkout').href = '#';
    }
}

loadProductsCart();