const express = require("express");
const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
require("dotenv").config();

//Create a User using: POST "/api/auth/createUser". No login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, msg: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPswd = await bcrypt.hash(req.body.password, salt);

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPswd,
      });

      const payload = {
        user: {
          id: user.id,
        },
      };
      //Creating token for authentication
      const authToken = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success, msg:"Internal error"});
    }
  }
);

//Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, msg: "Please try to login using correct credentials" });
      }
      const pswdCompare = await bcrypt.compare(password, user.password);
      if (!pswdCompare) {
        return res
          .status(400)
          .json({success, msg: "Please try to login using correct credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success, msg:"Internal error"});
    }
  }
);

//Get User details using: POST "/api/auth/getUser". Login required
router.get("/getUser",fetchUser,  async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({success, msg: "User Not Found"});
    }
    success = true;
    res.json({success, user});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success, msg: "Internal error"});
  }
});

module.exports = router;
