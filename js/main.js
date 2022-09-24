const links = [{
    label: "Week1 notes and exercises",
    url: "week1/index.html"
}]

function buildMainIndex(links) {
    var result = "<li>"
    for (const [k, v] of Object.entries(links)) {
        result = result.concat(" ", "<a href='", k, "'>", v, "</a></li>")
    }
    return result
}

const quiz = [
    ["What is Superman's real name?", "Clark Kent"],
    ["What is Wonder Woman's real name?", "Diana Prince"],
    ["What is Batman's real name?", "Bruce Wayne"]
];

let score