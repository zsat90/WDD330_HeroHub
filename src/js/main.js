import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");

let hero = [];
let favarray = [];
var heroid = 0;
var favid = 0;

// fetching the data
search.onkeyup = function () {
  var searchname = search.value;
  if (searchname !== "") {
    fetch(
      "https://superheroapi.com/api.php/6252879131479253/search/" +
        searchname.trim()
    )
      .then((response) => response.json())
      .then((data) => {
        function showhero() {
          var heronames = data.results;
          ul.innerText = " ";
          for (var i of heronames) {
            var li = document.createElement("li");
            li.innerHTML = i.name;
            li.id = i.id;

            li.addEventListener("click", function () {
              heroid = this.id;
              loadDetails(heroid);
              ul.innerText = " ";
            });
            li.setAttribute("style", "display: block;");
            ul.appendChild(li);
          }
        }

        showhero();
      })
      .catch((err) => console.log(err));
  }
};

// displaying the hero details on screen
function loadDetails(heroid) {
  fetch(`https://superheroapi.com/api.php/6252879131479253/${heroid}`)
    .then((response) => response.json())
    .then((data) => {
      var details = document.getElementById("details");
      details.setAttribute("style", "background-color:rgba(0,0,0,0.8);");

      var img = document.getElementById("img");
      img.setAttribute("src", data.image.url);

      var name = document.getElementById("name");
      name.innerHTML = data.name;

      var bio = document.getElementById("bio");
      bio.innerHTML = " Relatives :" + data.connections.relatives;

      var good = document.getElementById("good");
      good.innerText = "Nature :" + data.biography.alignment;

      var base = document.getElementById("base");
      base.innerHTML = "Work :" + data.work.base;

      var occ = document.getElementById("occupation");
      occ.innerHTML = "Occupation :" + data.work.occupation;

      var powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "Intelligence : " +
        data.powerstats.intelligence +
        ", Combat : " +
        data.powerstats.combat +
        ", Power : " +
        data.powerstats.power +
        ", Speed : " +
        data.powerstats.speed +
        ", Strength : " +
        data.powerstats.strength;

      var favv = document.getElementById("favbtn");
      favv.setAttribute("style", "display:flex;");
      favv.setAttribute("value", data.id);
    })
    .catch((error) => console.log(error));
}

// pushing data to favarray and setting it into localstorage.
function favpush(favid) {
  if (favarray.includes(favid)) {
    alert("Already Added to the Favorite List");
    return;
  }
  favarray.push(favid);

  localStorage.setItem("favlistarr", JSON.stringify(favarray));
}

document.getElementById("favbtn").addEventListener("click", () => {
  const value = document.getElementById("favbtn").value;

  favpush(value);
});
