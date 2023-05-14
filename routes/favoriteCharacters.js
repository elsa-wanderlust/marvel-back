const express = require("express");
const mongoose = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();
router.use(express.json());

// IMPORT THE MODELS
const FavoriteCharacters = require("../models/FavoriteCharacters");

// ROUTE 1 - ADD A CHARACTERS TO FAVORITE
router.post("/favorite/characters", isAuthenticated, async (req, res) => {
  try {
    const { marvelId, name, img, description } = req.body;

    const newFavoriteCharacters = new FavoriteCharacters({
      marvelId: marvelId,
      name: name,
      img: img,
      description: description,
      owner: req.user, // req.user because it's defined in of the isAuthenticated function, and we've decided to only return the account info
      // and not the salt nor the hash
    });
    // saves all details of the new favorite (we'll need for the favorite page) but returns the Marvel Id only
    // this is what need to be pushed in the state
    await newFavoriteCharacters.save();
    // console.log(newFavoriteCharacters);
    res.status(200).json(newFavoriteCharacters.marvelId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 2 - REMOVE A SPECIFIC CHARACTER FROM FAVORITES
router.delete("/favorite/characters/:id", isAuthenticated, async (req, res) => {
  try {
    // find one using the marvelId (the mongoDb Id is not available from the frontend) and we'll delete from the DB
    const favCharacterToDelete = await FavoriteCharacters.findOneAndDelete({
      marvelId: req.params.id,
    });
    res.status(200).json(favCharacterToDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 3 - GET ALL THE CHARACTERS THAT MATCH A USER ID - returns the MarvelId ONLY
router.get("/favorite/characters/", isAuthenticated, async (req, res) => {
  res.status(200).json("youpi");

  // try {
  //   const allFavCharacters = await FavoriteCharacters.find({
  //     owner: req.user,
  //   });
  //   // from allFavCharacters, returns their MarvelId only, in a tab
  //   let favCharactersMarvelId = [];
  //   for (let i = 0; i < allFavCharacters.length; i++) {
  //     favCharactersMarvelId.push(allFavCharacters[i].marvelId);
  //   }
  //   res.status(200).json(favCharactersMarvelId);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

// ROUTE 4 - GET ALL THE CHARACTERS THAT MATCH A USER ID - returns all info
router.get(
  "/favorite/characters/allDetails",
  isAuthenticated,
  async (req, res) => {
    try {
      const allFavCharacters = await FavoriteCharacters.find({
        owner: req.user,
      });
      res.status(200).json(allFavCharacters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
