//Creating all variables we will need
//will hold enter which will trigger some functions
var enterButton = document.getElementById("enter");
//will hold where text will be inputed
var input = document.getElementById("userInput");
//will hold parent where the list will be inserted or managed
var ul = document.querySelector("ul");
//will hold the list of itens
var item = document.getElementsByTagName("li");

//Check if locaStorage tasks exists;

if (typeof JSON.parse(localStorage.getItem('tasks')) != "undefined") {
    image_array = JSON.parse(localStorage.getItem('tasks'));
    console.log(typeof image_array, 1);
    console.log(Array.isArray(image_array));
    //if don't creates it and assign to image_array;
} else {
    localStorage.setItem("tasks", "[]");
    image_array = JSON.parse(localStorage.getItem('tasks'));
    console.log(image_array, 2);
}


//this function will render all inputs in local storage if they exist
window.addEventListener("load", callDataOnLoad);

//this function will check if there is data stored on localStorage and render it if true.
function callDataOnLoad(image_array) {

    //Check if image_array exists. if not creates it;
    if (typeof image_array == null) {
        // the array is undefined, so set it.
        image_array = [];
    } else {
        //loop the array and reder each existing element on the page
        image_array = JSON.parse(localStorage.getItem('tasks'));
        image_array.forEach(element => {
            if (element != null) {
                createListElement(element.input, element.status, element.index);
            }
        });
    }
}

//this function will get the leght of the input just to check if its not blank
function inputLength() {
    return input.value.length;
}


//how many li's we have?
function listLength() {
    return item.length;
}

//let's create our elements from the input
function createListElement(elementInput, elementStatus, elementIndex) {
    if (elementInput != null) {
        var li = document.createElement("li"); // creates an element "li"
        li.appendChild(document.createTextNode(elementInput)); //makes text from input field the li text
        li.setAttribute('id', elementIndex);
        ul.appendChild(li); //adds li to the parent
        input.value = ""; //Reset text input field
        if (elementStatus == true) {
            li.setAttribute('class', "done");
        }

        //START STRIKETHROUGH
        // because it's in the function, it only adds it for new items
        function crossOut() {
            li.classList.toggle("done");
            //change status value at localStorage.
            indexOfElementToBeChanged = li.getAttribute("id");
            changeStatus(indexOfElementToBeChanged);
        }
        li.addEventListener("click", crossOut);

        //END STRIKETHROUGH

        // START ADD DELETE BUTTON
        var dBtn = document.createElement("button");
        dBtn.appendChild(document.createTextNode("Delete"));
        li.appendChild(dBtn);
        dBtn.addEventListener("click", deleteListItem);
        // END ADD DELETE BUTTON


        //ADD CLASS DELETE (DISPLAY: NONE)
        function deleteListItem() {
            li.classList.add("delete")
            indexToBeDeleted = li.getAttribute('id');
            removeFromArray(parseInt(indexToBeDeleted));


        }
        //END ADD CLASS DELETE
    }
}

// I will input the item into the array in localstorage
function addListAfterClick() {
    if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
        //createListElement();
        if (typeof image_array == 'undefined') {
            // the array is undefined, so set it.
            image_array = [];

        }
        image_array = insertElementInArray(image_array);
        image_array.forEach(element => {
            if (element != null) {
                createListElement(element.input, element.status, element.index);
            }
        });
        location.reload();
    }
}

function insertElementInArray(image_array) {

    //insert new item in array with status false to the DONE option
    //I changed ID to be date Now.
    uniqueId = Date.now();
    image_array.push({ input: input.value, status: false, 'index': parseInt(uniqueId) });
    localStorage.setItem('tasks', JSON.stringify(image_array));
    return image_array;

}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { //this now looks to see if you hit "enter"/"return"
        //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
        addListAfterClick();
    }
}

function changeStatus(indexOfElementToBeChanged) {

    image_array = JSON.parse(localStorage.getItem('tasks'))
    for (var i = 0; i < image_array.length; i++) {
        if ((image_array[i]['index']) === parseInt(indexOfElementToBeChanged)) {
            if (image_array[i]['status'] == false) {
                image_array[i]['status'] = true;
                localStorage.setItem('tasks', JSON.stringify(image_array));
            } else {
                image_array[i]['status'] = false;
                localStorage.setItem('tasks', JSON.stringify(image_array));
            }
            break;
        }
    }
}


function removeFromArray(indexToBeDeleted) {
    //get the array from local storage
    image_array = JSON.parse(localStorage.getItem('tasks'))
    for (var i = 0; i < image_array.length; i++) {
        if (image_array[i]['index'] == indexToBeDeleted) {
            image_array.splice([i], 1);
            localStorage.setItem('tasks', JSON.stringify(image_array));
            break;
        }

    }
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);