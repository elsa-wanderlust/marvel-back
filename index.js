const express = require("express"); // import pkg to create server
const app = express(); // to declare the server
require("dotenv").config(); // to create environment variable (to store the API key)
const mongoose = require("mongoose"); // to connect to the DB
const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

// IMPORT THE ROUTES - necessary because the sever runs from this file
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
const userRoutes = require("./routes/user");
app.use(userRoutes);
const favoriteComicsRoutes = require("./routes/favoritesComics");
app.use(favoriteComicsRoutes);
const favoriteCharactersRoutes = require("./routes/favoritesCharacters");
app.use(favoriteCharactersRoutes);

app.all("*", (req, res) => [res.status(400).json("this route doesn't exist")]);

app.listen(process.env.PORT, () => {
  console.log("server has started 🦹");
});
