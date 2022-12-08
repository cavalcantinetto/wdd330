import { getCityName, buildNewLocationUrl } from './getCoords.js'
import { getDataFromApi } from './fecthData.js'
import { buildLocationUrl } from './getCoords.js'
import { main } from './app.js'

// const waitIcon = document.getElementById('loading')
// let baseUrlLocation = "https://api.openweathermap.org/data/2.5/weather?"
// let baseUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?"
// let completeUrlLocation = await buildLocationUrl(baseUrlLocation);

//will convert celsius to F
export function convertCelsiusToFarenheit(data) {
    let farenheit = (data * 9 / 5) + 32;
    return farenheit;
}