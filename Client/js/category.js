let ulTag = document.getElementsByClassName('hero__categories')[0].childNodes[3];
let ulTag2 = document.getElementById('categories');

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
    console.log(data);
    data.forEach(element => {
        ulTag.appendChild(createLi(element));
        if (ulTag2 !== null)
        {
            ulTag2.appendChild(createLi(element));
        }
    });
}

function createLi(data)
{
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = '#';
    a.innerHTML = data.name;
    a.id = data.id;
    li.appendChild(a);
    return li;
}

getCategories();