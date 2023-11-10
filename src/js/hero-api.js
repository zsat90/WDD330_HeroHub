// require("dotenv").config();
// const baseURL = process.env.BASE_URL;

// const convertToJson = async (res) => {
//   const message = await res.json();
//   if (res.ok) {
//     return message;
//   } else {
//     throw { name: "servicesError", message: message };
//   }
// };

// export const fetchHeroes = async (name) => {
//   const apiURL = `${baseURL}/search/${name}`;
//   try {
//     const res = await fetch(apiURL);
//     const data = await convertToJson(res);
//     console.log(data);
//     return data.results;
//   } catch (err) {
//     console.error("Error Fetching Hero");
//   }
// };
