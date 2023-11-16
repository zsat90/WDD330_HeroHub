export const fetchHeroes = async (name) => {
  const apiUrl = `http://localhost:3000/api/heroes/${name}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    const heroes = data.results;
    return heroes;
  } catch (err) {
    console.log(err);
  }
};
