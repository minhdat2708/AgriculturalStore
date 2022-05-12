let userData = JSON.parse(localStorage.getItem('userData'));
if (localStorage.getItem('userData') !== null) {
    let e = document.getElementsByClassName('header__top__right__auth')[1]
    e.childNodes[1].href = '#'
    e.childNodes[1].childNodes[1].data = ' Logout';
    e.childNodes[1].childNodes[0].className = 'fa fa-sign-out'
    createUserHeader();
    e.addEventListener('click', logout);
    e.childNodes[1].addEventListener('click', logout);
    e.childNodes[1].childNodes[0].addEventListener('click', logout)
}

function createUserHeader() {
    let e = document.getElementsByClassName('header__top__right__social')[1]
    let div = document.createElement('div');
    div.id = 'header__top__right_user';
    div.className = 'header__top__right__auth';
    div.innerHTML = '<a href="#"><i class="fa fa-user"></i>' + userData.lastName + ' ' + userData.firstName + '</a>';
    e.after(div)
}

async function logout() {
    const init = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer Token ' + localStorage.getItem('accessToken'),
        },
    };
    const url = 'https://localhost/agricultural-products-store/public/api/v1/logout';

    let response = await fetch(url, init);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    window.location.href = 'index.html'
}