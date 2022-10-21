let links = [{
        "label": "Week1 notes and exercises",
        "url": "week1/index.html"
    }, {
        "label": "Week2 notes and exercises",
        "url": "week2/index.html"
    }, {
        "label": "Week3 notes and exercises",
        "url": "week3/index.html"
    },
    {
        "label": "Week4 notes and exercises",
        "url": "week4/index.html"
    }, {
        "label": "Week5 notes and exercises",
        "url": "week5/index.html"
    }, {
        "label": "MID TERM CHALLENGE",
        "url": "challenge/index.html"
    }

];

let weeklinks = buildMainIndex(links); //here it is defined. new comment

function buildMainIndex(links) {
    var result = "";
    let size = links.length;
    for (let i = 0; i < size; i++) {
        result = result.concat("<li><a href='", links[i].url, "'>", links[i].label, "</a></li>");

    }
    console.log(result);
    return result
}

function createElement(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text;
    return el;
}

const quiz = [
    ["What is Superman's real name?", "Clark Kent"],
    ["What is Wonder Woman's real name?", "Diana Prince"],
    ["What is Batman's real name?", "Bruce Wayne"]
];

let score