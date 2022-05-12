const form = document.querySelector("form"),
    eField = form.querySelector(".email"),
    eInput = eField.querySelector("input"),
    pField = form.querySelector(".password"),
    pInput = pField.querySelector("input");

form.onsubmit = async (e) => {
    e.preventDefault();
    if (eInput.value == "") {
        eField.classList.add("shake", "error");
    } else {
        checkEmail();
    }
    if (pInput.value == "") {
        pField.classList.add("shake", "error");
    }

    setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => {
        checkEmail();
    }

    function checkEmail() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!eInput.value.match(pattern)) {
            eField.classList.add("error");
            let errorTxt = eField.querySelector(".error-txt");
            (eInput.value != "") ? errorTxt.innerHTML = "Invalid email": errorTxt.innerHTML = "Email can be not empty";
        } else {
            eField.classList.remove("error");
        }
    }

    pInput.onkeyup = () => {
        if (pInput.value == "") {
            pField.classList.add("error");
        } else {
            pField.classList.remove("error");
        }
    }

    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        await login();
    }
}

async function login() {
    let inputTags = document.getElementsByTagName('input')
    const init = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'email': inputTags[0].value,
            'password': md5(inputTags[1].value)
        })
    };
    const url = 'https://localhost/agricultural-products-store/public/api/v1/login';

    let response = await fetch(url, init);
    if (response.status === 200) {
        let responseJson = await response.json();
        localStorage.setItem("userData", JSON.stringify(responseJson.data));
        localStorage.setItem("accessToken", responseJson.accessToken);
        window.location.href = 'index.html'
    } else if (response.status === 401) {
        let responseJson = 'Invalid email or password';
        alertLogin(responseJson)
    }
}

function alertLogin(message) {
    alert('fasfasfas')
}