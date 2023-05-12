const mongoose = require("mongoose");

const FavoriteComics = mongoose.model("FavoriteComics", {
  marvelId: String,
  name: String,
  img: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = FavoriteComics;
