const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const port = 3000;

app.use(cors());

app.use(express.static("src"));

app.get("/api/heroes/:name", async (req, res) => {
  const { name } = req.params;
  const apiKey = "6252879131479253"; // Replace with your actual Superhero API key

  const apiUrl = `https://superheroapi.com/api/${apiKey}/search/${name}`;

  try {
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      throw new Error(
        `Failed to fetch data from Superhero API: ${apiResponse.statusText}`
      );
    }

    const data = await apiResponse.json();
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching data from Superhero API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
