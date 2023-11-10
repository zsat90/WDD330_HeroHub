import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const fetchHeroes = async (name) => {
  let apiUrl = `https://superheroapi.com/api/6252879131479253/search/${name}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    const heroes = data.results;
    console.log("heroes", heroes);
    return heroes;
  } catch (err) {
    console.log(err);
  }
};

fetchHeroes("batman");
