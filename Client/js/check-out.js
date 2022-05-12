const form = document.querySelector(".ordered");
nameField = form.querySelector(".name"),
nameInput = nameField.querySelector("input"),

countryField = form.querySelector(".country"),
countryInput = countryField.querySelector("input"),

addressField = form.querySelector(".address"),
addressInput = addressField.querySelector("input"),

phoneField = form.querySelector(".phone"),
phoneInput = phoneField.querySelector("input"),

emailField = form.querySelector(".email"),
emailInput = emailField.querySelector("input");

form.onsubmit = (e) => {
    e.preventDefault();
    if (nameInput.value == "") { 
        nameField.classList.add("error");
    }
    if (countryInput.value == "") { 
        countryField.classList.add("error");
    }
    if (addressInput.value == "") {
        addressField.classList.add("error");
    }
    if (phoneInput.value == "") {
        phoneField.classList.add("error");
    } else {
        checkPhoneNumber();
    }
    if (emailInput.value == "") {
        emailField.classList.add("error");
    } else {
        checkEmail();
    }
    if (!nameField.classList.contains("error") && !countryField.classList.contains("error") && !addressField.classList.contains("error") && !phoneField.classList.contains("error") && !emailField.classList.contains("error")) {
        alert("You ordered successfully!");
    }
}

nameInput.onkeyup = () => {
    if (nameInput.value == "") {
        nameField.classList.add("error");
    } else {
        nameField.classList.remove("error");
    }
}

addressInput.onkeyup = () => {
    if (addressInput.value == "") {
        addressField.classList.add("error");
    } else {
        addressField.classList.remove("error");
    }
}

countryInput.onkeyup = () => {
    if (countryInput.value == "") {
        countryField.classList.add("error");
    } else {
        countryField.classList.remove("error");
    }
}

emailInput.onkeyup = () => {
    checkEmail();
}

function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(pattern)) {
        emailField.classList.add("error");
        let errorTxt = emailField.querySelector(".error-txt");
        (emailInput.value != "") ? errorTxt.innerHTML = "Invalid email" : errorTxt.innerHTML = "Email can be not empty";
    } else {
        emailField.classList.remove("error");
    }
}

phoneInput.onkeyup = () => {
    checkPhoneNumber();
}

function checkPhoneNumber() {
    let pattern = /^[0-9]{10}$/;
    if (!phoneInput.value.match(pattern)) {
        phoneField.classList.add("error");
        let errorTxt = phoneField.querySelector(".error-txt");
        (phoneInput.value != "") ? errorTxt.innerHTML = "Invalid phone number" : errorTxt.innerHTML = "Phone number can be not empty";
    } else {
        phoneField.classList.remove("error");
    }
}


