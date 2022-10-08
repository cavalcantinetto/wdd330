function makeHero(e) {
    e.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = form.heroName.value; // create a name propert based on the input field's value
    hero.realName = form.realName.value; // creates a realName Property
    hero.powers = [];
    for (i = 0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    }
    hero.category = form.category.value;
    hero.age = form.age.value;
    hero.city = form.city.value;
    hero.origin = form.origin.value;
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    console.log(hero)
    return hero;
}

function writePowers(form) {
    for (let i = 0; i <= form.length; i++) {
        if (form[i].checked) {
            form.push(form[i].value)
        }
    }
}