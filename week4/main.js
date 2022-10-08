function gettingForm() {
    const form = document.forms[0];
    //console.log(form);
    return form;
}

function gettingElementsOnForm(form) {
    formElements = form.elements;
    return formElements;
}

function search(e) {
    alert(`You have searched for: ${input.value}`);
    e.preventDefault();

}

function setSearchValue(input, valueToInput) {
    input.value = valueToInput;
}

function cleanFormField(input) {
    if (input.value === "valueToInput") {
        input.value = "";
    }
}

function inputFormValue(input) {
    if (input.value === "") {
        setSearchValue(input, "ValueToInput");
    }
}