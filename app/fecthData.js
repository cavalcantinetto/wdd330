export function getDataFromApi(url) {
    return fetch(url)
        .then(data => {
            if (!data.ok) {
                console.log("it did not work well!");
                throw Error(data.statusText)
            } else {
                console.log("it worked well!");
                return data.json();
            }
        })
        .catch(function(error) {
            console.log(error);
        })
}