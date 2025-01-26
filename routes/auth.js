const express = require('express');
const router = require('express').Router();
const User = require('../models/User');


//Create a User using: POST "/api/auth/". No login required
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.json({message: 'User created successfully',"user":user});
});

module.exports = router;