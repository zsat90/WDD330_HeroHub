import { loadHeaderFooter } from "./utils.mjs";
import { fetchHeroes } from "./hero-api";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  //   const superheroesList = document.getElementById("superheroesList");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchInput = document.getElementById("searchInput").value.trim();

    if (searchInput === "") {
      alert("Please enter a superhero name");
      return;
    }

    try {
      // Fetch superhero data from the API
      const superheroData = await fetchHeroes(searchInput);

      // Display the list of superheroes
      displaySuperheroes(superheroData);
    } catch (error) {
      console.error("Error fetching superhero data:", error);
    }
  });
});
