function validateTextFields() {
    return validateUsername(document.getElementById("usernameTF").value) &&
        validatePassword(document.getElementById("passwordTF").value);
}

function validateUsername(text) {
    if (!validateTrim(text)) {
        alert("Username not valid");
        return false;
    }
    return true;
}

function validatePassword(pass) {
    if (!validateTrim(pass)) {
        alert("Password not valid");
        return false;
    }
    return true;
}

function validateTrim(text) {
    return !(text.trim() === "");
}

function loginToSite() {
    if (validateTextFields()) {
        return true;
    }
    return false;
}