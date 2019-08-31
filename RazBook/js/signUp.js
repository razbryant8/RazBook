function validateTextFields() {
    var f1, f2, f3, f4, f5;
    f1 = validateUsername(document.getElementById("usernameTF").value);
    f2 = validateFullName(document.getElementById("fullnameTF").value);
    f3 = validateBirthDay(document.getElementById("birthdayTF").value);
    f4 = validatePassword(document.getElementById("passwordTF").value, document.getElementById("confPasswordTF").value);
    f5 = validatePhoto(document.getElementById("profilePhoto").value);
    return f1 && f2 && f3 && f4 && f5;
}


function validateUsername(text) {
    if (!validateTrim(text)) {
        alert("Username not valid");
        return false;
    }
    return true;
}

function validateFullName(text) {
    if (!validateTrim(text)) {
        alert("Full name not valid");
        return false;
    }
    return true;
}

function validateBirthDay(birthday) {
    if (birthday == "") {
        alert("Please enter the Date!")
        return false;
    } else if (!birthday.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)) {
        alert('date format is wrong');
        return false;
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();

    var birthdayParts = birthday.split("/");
    var myBirthday = new Date(birthdayParts[2], birthdayParts[1] - 1, birthdayParts[0]);
    if (new Date(yyyy, mm, dd) <= myBirthday) {
        alert("Current or future date is not allowed.");
        return false;
    }
    return true;
}

function validatePassword(pass, confPass) {
    if (!validateTrim(pass)) {
        alert("Password not valid");
        return false;
    } else {
        if (!comparePass(pass, confPass)) {
            alert("Passwords not equal");
            return false;
        }
    }
    return true;
}

function validatePhoto(photo) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!validateTrim(photo)) {
        alert("Please Choose Photo");
        return false;
    } else if (!allowedExtensions.exec(photo)) {
        alert("Wrong format. choose jpeg/png/gif");
        return false;
    }
    return true;
}

function comparePass(pass, confPass) {
    return pass == confPass;
}

function validateTrim(text) {
    return !(text.trim() === "");
}

function signUp() {
    if (validateTextFields()) {
        return true;
    }
    return false;
}