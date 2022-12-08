import { buildLocationUrl, getCityName, buildNewLocationUrl } from './getCoords.js'
import { getDataFromApi } from './fecthData.js'
//import {convertCelsiusToFarenheit} from './utilities'


//get all fields at index page that will be changed or fullfilled and define variables
const timeZone = document.getElementById('timezone');
var temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const newplace = document.getElementById('newplace');
const btn = document.getElementById('searchbtn');
const waitIcon = document.getElementById('loading')
const spanTemperature = document.getElementById('tempsign');
let tempInCelsius;


//define adresses for the API's
let baseUrlLocation = "https://api.openweathermap.org/data/2.5/weather?"
let baseUrlGeo = "https://api.openweathermap.org/geo/1.0/direct?"
waitIcon.style.visibility = 'visible';

//build Url to retrieve data
let completeUrlLocation = await buildLocationUrl(baseUrlLocation);

await main();

export async function main() {
    waitIcon.style.visibility = 'visible';
    temperature = document.getElementById('temperature');
    //It will hold all data based on coordinates. Data from the API will be held here
    const data = await getDataFromApi(completeUrlLocation)
        //Set temperature from data
    tempInCelsius = data.main.temp
    temperature.setAttribute('name', 'celsius');
    temperature.textContent = tempInCelsius;
    //Set stantion name from data
    timeZone.textContent = `Station: ${data.name} / ${data.sys.country}`;
    //Add listener to convert C to F or vice-versa
    temperature.addEventListener('click', tempConverter);
    //Call both functions when triggered
    function tempConverter() {
        //convert Temp
        convertTemp(tempInCelsius);
        //set unit
        changeFandC(spanTemperature);

    }
    // set description from data
    description.textContent = data.weather[0].description;
    //set feels_like from data
    icon.textContent = "Feels Like:  " + data.main.feels_like + "ºC";
    //Add a listener to get new places
    btn.addEventListener('click', getNewCities)
        //controlls wait signal
    waitIcon.style.visibility = 'hidden'

}

//function to get cities by name from tha API (second file)
export async function getNewCities() {
    waitIcon.style.visibility = 'visible';
    //form url to be called
    let newPlace = await getNewPlace()
        //test if it user has inputed any value and then go on or stops
    if (newPlace) {
        const completeCityUrl = await getCityName(baseUrlGeo, newPlace)
            //Get data based on the new url
        const newCities = await getDataFromApi(completeCityUrl)
            //tests if file is empty
        if (newCities == "") {
            errorCatch()

        } else {
            //Insert the options at the view
            await insertCities(newCities);

        }
    } else {
        errorCatch();
    }

    //removes wait signal
    waitIcon.style.visibility = 'hidden';

}

//define the function that will insert cities as html element
export async function insertCities(newCities) {
    const existingDiv = getDivElement('cities');
    //empty the div
    existingDiv.innerHTML = "";
    existingDiv.setAttribute('class', "cities");
    if (newCities) {
        //populate the div with new data
        newCities.forEach(e => {
            const div = document.createElement("div")
            div.setAttribute('class', `card`);
            const p1 = document.createElement("p");
            const cityName = e.name;
            p1.innerHTML = `City: ${cityName}`;
            div.appendChild(p1);
            const p2 = document.createElement("p")
            const stateName = e.state;
            p2.innerHTML = `State: ${stateName}`
            div.appendChild(p2);
            const p3 = document.createElement("p")
            const countryName = e.country;
            p3.innerHTML = `Country: ${countryName}`;
            div.appendChild(p3);
            const p4 = document.createElement("p");
            const lon = e.lon;
            p4.innerHTML = `Longitude: ${lon}`
            div.appendChild(p4);
            const p5 = document.createElement("p")
            const lat = e.lat;
            p5.innerHTML = `Latitude: ${lat}`
            div.appendChild(p5);
            //Insert a listener to change the place at main page and exibts new temperature
            div.addEventListener('click', async() => {
                waitIcon.style.visibility = 'visible';
                completeUrlLocation = await buildNewLocationUrl(baseUrlLocation, lat, lon);
                //removes the listener from temperature
                temperature.replaceWith(temperature.cloneNode(true));
                //get new data and call back the main function.
                main()
            }, false);
            existingDiv.appendChild(div)

        })
    } else {
        errorCatch()
    }

}


//returns the value that was imputed for a new search and clean it
export async function getNewPlace() {
    let newPlace = newplace.value;
    newplace.value = ""
    return newPlace;
}

//used to get a div in the main page
export function getDivElement(name) {
    const divElement = document.getElementById(name);
    return divElement;
}

//Convert the temperature between ºC-F
function convertTemp() {
    let atribute = temperature.getAttribute('name')
    if (atribute == 'celsius') {
        let tempInFahrenheit = Math.round(((tempInCelsius * 1.8) + 32) * 100) / 100;
        temperature.textContent = tempInFahrenheit;
        temperature.removeAttribute('name')
        temperature.setAttribute('name', 'fahrenheit');
        tempInCelsius = tempInFahrenheit;

    }
    if (atribute == 'fahrenheit') {
        let newtempInCelsius = Math.round(((tempInCelsius - 32) * (5 / 9)) * 100) / 100;
        temperature.textContent = newtempInCelsius;
        temperature.removeAttribute('name')
        temperature.setAttribute('name', 'celsius');
        tempInCelsius = newtempInCelsius;

    }

}

//Change simbol ºC-F
function changeFandC(spanTemperature) {
    if (temperature.getAttribute('name') == "celsius") {
        spanTemperature.textContent = "ºC";

    }
    if (temperature.getAttribute('name') == "fahrenheit") {
        spanTemperature.textContent = "F";
    }
}

function errorCatch() {
    //Get Div at HTML
    const existingDiv = getDivElement('cities');
    //empty the div
    existingDiv.setAttribute('class', `card`);
    existingDiv.innerHTML = "There was no Data to return. Check if you filled search field correctly.";
}