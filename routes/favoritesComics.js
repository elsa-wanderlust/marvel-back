const express = require("express");
const mongoose = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();
router.use(express.json());

// IMPORT THE MODELS
const FavoriteComics = require("../models/FavoriteComics");

// ROUTE 1 - ADD A COMIC TO FAVORITE
router.post("/favorite/comics", isAuthenticated, async (req, res) => {
  try {
    const { marvelId, name, img, description } = req.body;

    const newFavoriteComics = new FavoriteComics({
      marvelId: marvelId,
      name: name,
      img: img,
      description: description,
      owner: req.user, // req.user because it's defined in of the isAuthenticated function, and we've decided to only return the account info
      // and not the salt nor the hash
    });
    // saves all details of the new favorite (we'll need for the favorite page) but returns the Marvel Id only
    // this is what need to be pushed in the state
    await newFavoriteComics.save();
    // console.log(newFavoriteComics);
    res.status(200).json(newFavoriteComics.marvelId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 2 - REMOVE A SPECIFIC COMIC FROM FAVORITES
router.delete("/favorite/comics/:id", isAuthenticated, async (req, res) => {
  try {
    // find one using the marvelId (the mongoDb ID is not available from the frontend) and we'll delete from the DB
    const favComicToDelete = await FavoriteComics.findOneAndDelete({
      marvelId: req.params.id,
    });
    res.status(200).json(favComicToDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 3 - GET ALL THE COMICS THAT MATCH A USED ID
router.get("/favorite/comics", isAuthenticated, async (req, res) => {
  try {
    const allFavComics = await FavoriteComics.find({
      owner: req.body.id,
    });
    // console.log(allFavComics);
    res.status(200).json(allFavComics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 4 - GET ALL THE COMICS THAT MATCH A USED ID - returns only the Marvel movie IDs
// why did I have to change it to post?!?!?!?!?!
router.post("/favorite/comics/idMarvel", isAuthenticated, async (req, res) => {
  try {
    const allFavComics = await FavoriteComics.find({
      owner: req.body.id,
    });
    let favComicsMarvelId = [];
    for (let i = 0; i < allFavComics.length; i++) {
      favComicsMarvelId.push(allFavComics[i].marvelId);
    }
    res.status(200).json(favComicsMarvelId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
