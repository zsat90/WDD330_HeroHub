import { fetchAllHeroes } from "./heroes";
import { renderListWithTemplate } from "./utils.mjs";

function heroCardTemplate(hero) {
  return `<li class="hero-card">
      <a href="../hero_pages/index.html?hero=${hero.id}">
        <img src="${hero.image}" alt="Image of ${hero.name}" />
        <h3 class="card__name">${hero.name}</h3>
        <p class="hero-card__description">${hero.description}</p>
      </a>
    </li>`;
}

export default async function heroList(selector) {
  const el = document.querySelector(selector);

  try {
    // Get the list of all heroes
    const heroes = await fetchAllHeroes();

    // Render out the hero list
    renderListWithTemplate(heroCardTemplate, el, heroes);

    // Update title or any other element if needed
    document.querySelector(".title").innerHTML = "All Heroes";
  } catch (error) {
    console.error("Error fetching heroes:", error);
  }
}
