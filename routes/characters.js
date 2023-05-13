const express = require("express");
const router = express.Router(); // TBD
router.use(express.json()); // TBD
const axios = require("axios"); // to be able to send request to the Marvel API

// ROUTE 1 - get all the characters
router.get("/characters", async (req, res) => {
  // limit and skip have always a value (by default, 100 and 0 respectively)
  const limit = req.query.limit;
  const skip = (req.query.page - 1) * limit;
  let filters = `limit=${limit}&skip=${skip}`;
  // name doesnt always have a value
  const name = req.query.search;
  if (name !== undefined) {
    filters = filters.concat(`&name=${name}`);
  }

  try {
    const serverResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${filters}&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(serverResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
