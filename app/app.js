import { buildLocationUrl, getCityName, buildNewLocationUrl } from './getCoords.js'
import { getDataFromApi } from './fecthData.js'

//get all fields at index page that will be changed or fullfilled
const timeZone = document.getElementById('timezone');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const newplace = document.getElementById('newplace');
const btn = document.getElementById('searchbtn');
const waitIcon = document.getElementById('loading')


//define edresses for the API's
let baseUrlLocation = "https://api.openweathermap.org/data/2.5/weather?"
let baseUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?"
waitIcon.style.visibility = 'visible';

//build Url to retrieve data
let completeUrlLocation = await buildLocationUrl(baseUrlLocation);

await main();

async function main() {

    waitIcon.style.visibility = 'visible';
    //for testing purposes
    //console.log('Vou chamar a função agora')
    //For testing purposes
    //console.log(completeUrlLocation)
    //console.log('finalizada a primeira funcao')
    //console.log('Vou chamar a outra função agora')
    //It will hold all data based on coordinates. Data from the API will be held here
    const data = await getDataFromApi(completeUrlLocation)
        //For testing purposes
        //console.log(data);

    timeZone.textContent = `Station: ${data.name} / ${data.sys.country}`;
    temperature.textContent = data.main.temp;
    description.textContent = data.weather[0].description;
    icon.textContent = "Feels Like:  " + data.main.feels_like + "ºC";
    btn.addEventListener('click', getNewCities)
    waitIcon.style.visibility = 'hidden'

}

