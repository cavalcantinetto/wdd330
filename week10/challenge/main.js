import { getCompleteUrl } from './index.js';
import { getData } from './utilities.js';


const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';


async function geturl(baseUrl, maxRadius) {
    const url = await getCompleteUrl(baseUrl, maxRadius);
    return url;
}

console.log('processing...')
const completeUrl = await geturl(baseUrl, 10000);

const data = await getData(completeUrl);

console.log('processed')

//const listHtml = data.features.map((quake) => { return `${quake.properties.title}, ${new Date(quake.property.time)}` });
//data.forEach((e) => console.log(e.features.properties.title));
console.log(data.features);
const dataFeatures = data.features;
const htmlList = data.features.map(quake => { return `${quake.properties.title} ${new Date(quake.properties.time)}`; })


dataFeatures.forEach(element => {
    console.log(element.properties.title);
    console.log(new Date(element.properties.time));

});

const listElement = document.querySelector("#quakeList");
listElement.innerHTML = htmlList.join("<br>");