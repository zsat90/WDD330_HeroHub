import { fetchHeroes } from "./hero-api.js";

export async function searchHero(search, ul) {
  var searchname = search.value;
  if (searchname !== "") {
    try {
      const heroes = await fetchHeroes(searchname);
      console.log(heroes);

      function showhero() {
        var heronames = heroes;
        ul.innerText = " ";
        for (var i of heronames) {
          var li = document.createElement("li");
          li.innerHTML = i.name;
          li.id = i.id;

          li.addEventListener("click", function () {
            var heroid = this.id;
            console.log(heroid + "this is id");
            loadDetails(heroid);
            ul.innerText = " ";
          });
          li.setAttribute("style", "display: block;");
          ul.appendChild(li);
        }
      }

      showhero();
    } catch (err) {
      console.log(err);
    }
  }
}

export async function loadDetails(heroid) {
  try {
    const heroDetails = await fetchHeroes(heroid);
    console.log(heroDetails);

    var details = document.getElementById("details");
    details.setAttribute("style", "background-color:rgba(0,0,0,0.8);");

    var img = document.getElementById("img");
    img.setAttribute("src", heroDetails[0].image.url);

    var name = document.getElementById("name");
    name.innerHTML = heroDetails[0].name;

    var bio = document.getElementById("bio");
    bio.innerHTML = " Relatives :" + heroDetails[0].connections.relatives;

    var good = document.getElementById("good");
    good.innerText = "Nature :" + heroDetails[0].biography.alignment;

    var base = document.getElementById("base");
    base.innerHTML = "Work :" + heroDetails[0].work.base;

    var occ = document.getElementById("occupation");
    occ.innerHTML = "Occupation :" + heroDetails[0].work.occupation;

    var powestat = document.getElementById("powerstats");
    powestat.innerHTML =
      "Intelligence : " +
      heroDetails[0].powerstats.intelligence +
      ", Combat : " +
      heroDetails[0].powerstats.combat +
      ", Power : " +
      heroDetails[0].powerstats.power +
      ", Speed : " +
      heroDetails[0].powerstats.speed +
      ", Strength : " +
      heroDetails[0].powerstats.strength;

    var favv = document.getElementById("favbtn");
    favv.setAttribute("style", "display:flex;");
    favv.setAttribute("value", heroDetails[0].id);
  } catch (error) {
    console.log(error);
  }
}
