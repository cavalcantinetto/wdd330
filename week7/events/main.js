//Get elements on html page and hold it as variables
const textButton = document.getElementById("number");
const apiButton = document.getElementById("chuck");
const outputDiv = document.getElementById("output");

//const that will hold API adresses
const textURL = 'http://numbersapi.com/random';
const apiURL = 'https://api.chucknorris.io/jokes/random'

//function itself
textButton.addEventListener('click', () => {
    fetch(textURL).then(
            response => {
                outputDiv.innerHTML = 'Waiting For Response...';
                if (response.ok) { return response }
                throw Error(response.statusText);
            })
        .then(response => response.text())
        .then(text => outputDiv.innerText = text)
        .catch(error => console.log('There was an error:', error))
}, false);

apiButton.addEventListener('click', () => {
    fetch(apiURL).then(response => {
            outputDiv.innerHTML = "waiting for response...";
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(data => outputDiv.innerText = data.value)
        .catch(error => console.log('There was an error: ', error))
}, false)

// FUNCTIONS TO HANDLE TODO LIST
//get the button and add an event listener to it that has a callback to addTask
const form = document.getElementById('todo');
form.addEventListener('submit', addTask, false);

//defines addTask as function that would be called
function addTask(e) {
    //prevent default is necessary so the form won't be submited
    e.preventDefaut();
    //assign values to constants
    //the value that came from the form
    const number = form.task.value;
    //creats a dictionary with userId, task and status
    const task = {
            userId: 1,
            title: form.task.value,
            completed: false
        }
        //convert the task to a JSON file so we can send it
    const data = JSON.stringify(task);
    const url = 'https://jsonplaceholder.typicode.com/todos';

    const headers = new Headers({ 'Accept': 'application/json', 'Content-type': 'application/json' });
    //group method, headers and data to a request so we can send a complete information to be porccessed
    const request = new Request(url, {
        method: 'POST',
        header: headers,
        body: data
    });
    fetch(request)
        .then(response => response.JSON())
        .then(task => console.log(`Task saved with ${task.id}`))
        .catch(error => console.log('There was an error', error))
}