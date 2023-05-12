const express = require("express");
const router = express.Router(); // TBD
router.use(express.json()); // TBD
const axios = require("axios"); // to be able to send request to the Marvel API

// ROUTE 1 - get all the comics
router.get("/comics", async (req, res) => {
  // limit and skip have always a value (by default, 100 and 0 respectively)
  const limit = req.query.limit;
  const skip = (req.query.page - 1) * limit;
  let filters = `limit=${limit}&skip=${skip}`;
  // title doesnt always have a value
  const title = req.query.search;
  if (title !== undefined) {
    filters = filters.concat(`&title=${title}`);
  }
  try {
    const serverResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${filters}&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(serverResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 2 - get the details of one comic
// receive the comic ID as params
// router.get("/comic/:id", async (req, res) => {
//   try {
//     const comicID = req.params.id;
//     const serverResponse = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comic/${comicID}?apiKey=${process.env.MARVEL_API_KEY}`
//     );
//     res.status(200).json(serverResponse.data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// ROUTE 3 - get all the comics in which a specific characters appears
// receive the characters ID as params
router.get("/comics/:id", async (req, res) => {
  try {
    const characterID = req.params.id;
    const serverResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(serverResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
