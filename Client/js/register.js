const form = document.querySelector("form"),

nameField = form.querySelector(".name"),
nameInput = nameField.querySelector("input"),

// addressField = form.querySelector(".address"),
// addressInput = nameField.querySelector("input"),

eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),

pField = form.querySelector(".password"),
pInput = pField.querySelector("input"),

confirmField =  form.querySelector(".confirm-password"),
confirmInput = confirmField.querySelector("input");


form.onsubmit = (e) => {
    e.preventDefault();
    if (nameInput.value == "") {
        nameField.classList.add("shake", "error");
    }
    // if (addressInput.value == "") {
    //     addressField.classList.add("shake", "error");
    // }
    if (eInput.value == "") {
        eField.classList.add("shake", "error");
    } else {
        checkEmail();
    }
    if (pInput.value == "") {
        pField.classList.add("shake", "error");
    } else {
        checkPassword();
    }


    setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
        nameField.classList.remove("shake");
        addressField.classList.remove("shake");
    }, 500);

    nameInput.onkeyup = () => {
        if (nameInput.value == "") {
            nameField.classList.add("error");
        } else {
            nameField.classList.remove("error");
        }
        // checkName();
    }

    // function checkName() {
    //     let pattern = /[a-zA-Z][a-zA-Z ]{1,}/;
    //     if (!nameInput.value.match(pattern)) {
    //         nameField.classList.add("error");
    //         let errorTxt = nameField.querySelector(".error-txt");
    //         (nameInput.value != "") ? errorTxt.innerHTML = "Invalid name" : errorTxt.innerHTML = "Name can not be empty";
    //     } else {
    //         nameField.classList.remove("error");
    //     }
    // }

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

    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        window.location.href = "#";
    }
}