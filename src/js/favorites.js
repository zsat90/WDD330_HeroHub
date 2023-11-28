import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

let favouritebarList = document.getElementById("favlistitem");
let list = [];
list = JSON.parse(localStorage.getItem("favlistarr"));

// to fetch the  updated list
function fetching(list) {
  for (var i = 0; i < list.length; i++) {
    loadhero(list[i]);
  }
}

// loading data of  hero function
async function loadhero(heroid) {
  const URL =
    "https://www.superheroapi.com/api.php/6252879131479253/" + heroid.trim();

  const res = await fetch(`${URL}`);
  const data = await res.json();

  if (data) {
    herolistdis(data);
  }
}
// to display the data of the movie
function herolistdis(hero) {
  let herolistItem = document.createElement("div");
  herolistItem.innerHTML = "";
  herolistItem.innerHTML = `
  <div id="outerbox">
  <div id="innerbox">
    <img src="${hero.image.url}" id="favlistimg">
  </div>
  <div>
    <h5>${hero.name}</h5>
    <hr>
    <div>
      <p>Relatives: ${hero.connections.relatives}</p>
      <p>Nature: ${hero.biography.alignment}</p>
      <p>Work: ${hero.work.base}</p>
      <p>Occupation: ${hero.work.occupation}</p>
      <p>Powerstats: Intelligence - ${hero.powerstats.intelligence}, Combat - ${hero.powerstats.combat}, Power - ${hero.powerstats.power}, Speed - ${hero.powerstats.speed}, Strength - ${hero.powerstats.strength}</p>
    </div>
    <hr>
    <button class="btn btn-primary" id="remove" type="submit" value=${hero.id}>Remove</button>
  </div>
</div>
`;

  favouritebarList.appendChild(herolistItem);

  const removeButton = herolistItem.querySelector("#remove");
  removeButton.addEventListener("click", () => {
    remove(hero.id);
  });
}

// to remove the item from the list
function remove(value) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      list.splice(i, 1);
    }
  }

  localStorage.setItem("favlistarr", JSON.stringify(list));
  favouritebarList.innerHTML = "";
  fetching(list);
}

fetching(list);
