import { buildLocationUrl, getCityName, buildNewLocationUrl } from './getCoords.js'
import { getDataFromApi } from './fecthData.js'
//import {convertCelsiusToFarenheit} from './utilities'


//get all fields at index page that will be changed or fullfilled
const timeZone = document.getElementById('timezone');
var temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const newplace = document.getElementById('newplace');
const btn = document.getElementById('searchbtn');
const waitIcon = document.getElementById('loading')
let tempInCelsius;


//define edresses for the API's
let baseUrlLocation = "https://api.openweathermap.org/data/2.5/weather?"
let baseUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?"
waitIcon.style.visibility = 'visible';

//build Url to retrieve data
let completeUrlLocation = await buildLocationUrl(baseUrlLocation);

await main();

export async function main() {
    waitIcon.style.visibility = 'visible';
    temperature = document.getElementById('temperature');

    //It will hold all data based on coordinates. Data from the API will be held here

    const data = await getDataFromApi(completeUrlLocation)
    tempInCelsius = data.main.temp
    timeZone.textContent = `Station: ${data.name} / ${data.sys.country}`;
    temperature.setAttribute('name', 'celsius');
    temperature.textContent = tempInCelsius;

    temperature.addEventListener('click', tempConverter);


    function tempConverter() {
        convertTemp(tempInCelsius);


    }

    description.textContent = data.weather[0].description;
    icon.textContent = "Feels Like:  " + data.main.feels_like + "ºC";
    btn.addEventListener('click', getNewCities)
    waitIcon.style.visibility = 'hidden'

}

export async function getNewCities() {
    waitIcon.style.visibility = 'visible';
    let newPlace = await getNewPlace()
    const completeCityUrl = await getCityName(baseUrlGeo, newPlace)
    const newCities = await getDataFromApi(completeCityUrl)
        //agora tem que inserir essas cidades na tela para o usuário escolher.
    await insertCities(newCities);
    waitIcon.style.visibility = 'hidden';
    //temperature.replaceWith(temperature.cloneNode(true))

}


export async function insertCities(newCities) {

    const existingDiv = getDivElement('cities');
    existingDiv.innerHTML = "";
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
        div.addEventListener('click', async() => {
            waitIcon.style.visibility = 'visible';
            completeUrlLocation = await buildNewLocationUrl(baseUrlLocation, lat, lon);
            //console.log(completeUrlLocation);
            //get new data and call back the function.
            temperature.replaceWith(temperature.cloneNode(true));
            main()
        }, false);
        existingDiv.appendChild(div)
            //For testing purposes
            // console.log(div)
            // console.log(existingDiv)

    })
}


//returns the value that was imputed for a new search
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

function temperatureCloneNode() {
    temperature.replaceWith(temperature.cloneNode(true));
}