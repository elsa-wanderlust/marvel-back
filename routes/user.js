const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();
const fileUpload = require("express-fileupload");

// IMPORT THE MODELS
const FavoriteComics = require("../models/FavoriteComics");
const Users = require("../models/Users");

// ROUTE 1 - SIGN UP
router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userAlreadyExisted = await Users.findOne({ email: email });
    if (!username || !email || !password) {
      return res.status(400).json({ message: "missing parameter" });
    }
    if (userAlreadyExisted !== null) {
      return res.status(409).json({
        message: "there is already an account associated to that email",
      });
    }
    const salt = uid2(10);
    const hash = SHA256(salt + password).toString(encBase64);
    const token = uid2(32);
    const newUser = new Users({
      email,
      account: { username },
      token,
      hash,
      salt,
    });
    console.log(newUser);

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      token: token,
      account: { username: username },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTE 2 - LOG IN
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    // is there an document w/ that email in the DB?
    if (user === null) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // is the pw correct?
    const newHash = SHA256(user.salt + password).toString(encBase64);
    if (newHash !== user.hash) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    res.status(200).json({
      _id: user._id,
      token: user.token,
      account: user.account,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
