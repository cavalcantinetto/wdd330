import { getCityName, buildNewLocationUrl } from './getCoords.js'


export async function getNewCities() {
    waitIcon.style.visibility = 'visible';
    let newPlace = await getNewPlace()
    const completeCityUrl = await getCityName(baseUrlGeo, newPlace)
        //For testing purposes
        //console.log(completeCityUrl);
        //console.log("getting new cities")
    const newCities = await getDataFromApi(completeCityUrl)
        //agora tem que inserir essas cidades na tela para o usuário escolher.
    await insertCities(newCities);
    waitIcon.style.visibility = 'hidden';

}


export
async function insertCities(newCities) {
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
            completeUrlLocation = await buildNewLocationUrl(baseUrlLocation, lat, lon);
            //console.log(completeUrlLocation);
            //get new data and call back the function.
            waitIcon.style.visibility = 'visible';
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