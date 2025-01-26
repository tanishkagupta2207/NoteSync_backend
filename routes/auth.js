const express = require("express");
const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.send(user);

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error");
    }
  }
);

module.exports = router;