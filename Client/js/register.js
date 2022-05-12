const form = document.querySelector("form"),

firstNameField = form.querySelector(".first-name"),
firstNameInput = firstNameField.querySelector("input"),

lastNameField = form.querySelector(".last-name"),
lastNameInput = lastNameField.querySelector("input"),

eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),

phoneNumberField = form.querySelector(".phone-number"),
phoneNumberInput = phoneNumberField.querySelector("input"),

addressField = form.querySelector(".address"),
addressInput = addressField.querySelector("input"),

pField = form.querySelector(".password"),
pInput = pField.querySelector("input"),

confirmField =  form.querySelector(".confirm-password"),
confirmInput = confirmField.querySelector("input");

console.log(form);

form.onsubmit = async (e) => {
    e.preventDefault();
    if (firstNameInput.value == "") {
        firstNameField.classList.add("shake", "error");
    }
    if (lastNameInput.value == "") {
        lastNameField.classList.add("shake", "error");
    }
    if (addressInput.value == "") {
        addressField.classList.add("shake", "error");
    }
    if (eInput.value == "") {
        eField.classList.add("shake", "error");
    } else {
        checkEmail();
    }

    if (phoneNumberInput.value == "") {
        phoneNumberField.classList.add("shake", "error");
    } else {
        checkPhoneNumber();
    }

    if (pInput.value == "") {
        pField.classList.add("shake", "error");
    } else {
        checkPassword();
    }

    setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
        firstNameField.classList.remove("shake");
        lastNameField.classList.remove("shake");
        phoneNumberField.classList.remove("shake");
        addressField.classList.remove("shake");
    }, 500);

    firstNameInput.onkeyup = () => {
        if (firstNameInput.value == "") {
            firstNameField.classList.add("error");
        } else {
            firstNameField.classList.remove("error");
        }
    }

    lastNameInput.onkeyup = () => {
        if (lastNameInput.value == "") {
            lastNameField.classList.add("error");
        } else {
            lastNameField.classList.remove("error");
        }
    }

    addressInput.onkeyup = () => {
        if (addressInput.value == "") {
            addressField.classList.add("error");
        } else {
            addressField.classList.remove("error");
        }
    }

    eInput.onkeyup = () => {
        checkEmail();
    }

    function checkEmail() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!eInput.value.match(pattern)) {
            eField.classList.add("error");
            let errorTxt = eField.querySelector(".error-txt");
            (eInput.value != "") ? errorTxt.innerHTML = "Invalid email" : errorTxt.innerHTML = "Email can be not empty";
        } else {
            eField.classList.remove("error");
        }
    }

    phoneNumberInput.onkeyup = () => {
        checkPhoneNumber();
    }

    function checkPhoneNumber() {
        let pattern = /^[0-9]{10}$/;
        if (!phoneNumberInput.value.match(pattern)) {
            phoneNumberField.classList.add("error");
            let errorTxt = phoneNumberField.querySelector(".error-txt");
            (phoneNumberInput.value != "") ? errorTxt.innerHTML = "Invalid phone number" : errorTxt.innerHTML = "Phone number can be not empty";
        } else {
            phoneNumberField.classList.remove("error");
        }
    }

    pInput.onkeyup = () => {
        checkPassword();
    }

    function checkPassword() {
        let pattern = /(?=.{8,})/;
        if (!pInput.value.match(pattern)) {
            pField.classList.add("error");
            let errorTxt = pField.querySelector(".error-txt");
            (pInput.value != "") ? errorTxt.innerHTML = "Password at least 8 characters" : errorTxt.innerHTML = "Password can be not empty";
        } else {
            pField.classList.remove("error");
        }
    }

    confirmInput.onkeyup = () => {
        matchPassword();
    }

    function matchPassword() {
        if (pInput.value != confirmInput.value) {
            confirmField.classList.add("error");
            let errorTxt = confirmField.querySelector(".error-txt");
            errorTxt.innerHTML = "Password does not match";
        } else {
            confirmField.classList.remove("error");
        }
    }

    if (!firstNameField.classList.contains("error") && !lastNameField.classList.contains("error") && !addressField.classList.contains("error") && !eField.classList.contains("error") && !phoneNumberField.classList.contains("error") && !pField.classList.contains("error") && !confirmField.classList.contains("error")) {
        window.location.href = "#";
    }
}

function register()
{
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