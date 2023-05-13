const mongoose = require("mongoose");

const FavoriteCharacters = mongoose.model("FavoriteCharacters", {
  marvelId: String,
  name: String,
  img: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = FavoriteCharacters;
