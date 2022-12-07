//makes a constante that holds a promisse with coordinates.
export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

export async function buildLocationUrl(baseUrl) {
    const result = await getLocation();
    const addToUrl = `lat=${result.coords.latitude}&lon=${result.coords.longitude}&units=metric&appid=c5bd847648dc9700554df76673feb474`;
    const completeUrl = baseUrl + addToUrl;
    return completeUrl;
};

export async function getCityName(baseUrl, city) {
    const result = await getLocation();
    const addToUrl = `q=${city}&limit=10&appid=c5bd847648dc9700554df76673feb474`
    const completeUrl = baseUrl + addToUrl;
    return completeUrl;
};

export async function buildNewLocationUrl(baseUrl, lat, lon) {
    const result = await getLocation();
    const addToUrl = `lat=${lat}&lon=${lon}&units=metric&appid=c5bd847648dc9700554df76673feb474`;
    const completeUrl = baseUrl + addToUrl;
    return completeUrl;
};