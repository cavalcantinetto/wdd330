const email = document.getElementById('t2');
const error = document.querySelector('span.error')
const form = document.querySelector('form');
//console.log(form)
email.addEventListener("input", (e) => {
    if (email.validity.valid) {
        error.innerHTML = "";
        error.className = "error";

    } else {
        showError(email);
    }
});

form.addEventListener('submit', (e) => {
    if (!email.validity.vality) {
        showError(email);
        e.preventDefault();
    }
});

function showError(email) {
    if (email.validity.valueMissing) {
        error.innerHTML = "You need to enter an email adress";
        console.log("erro 1")
    } else if (email.validity.typeMismach) {
        error.innerHTML = "Email adress needs to be valid";
        console.log("erro 2")
    } else if (email.validity.tooShort) {
        error.innerHTML = `minumin amount of character is ${ email.minLength} you inputed ${email.value.length}.`;
        console.log("erro 3")
    } else {
        error.innerHTML = `minumin amount of character is ${ email.minLength} you inputed ${email.value.length}.`;
    }
    error.className = 'error active';
}
//console.log(form.submit)