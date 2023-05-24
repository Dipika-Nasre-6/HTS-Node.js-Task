const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const users = require("../controllers/User.controller");

router.post('/signUp', [
    body('first_name', 'Enter a Valid Name').isLength({min: 2}),
    body('last_name', 'Enter a Valid Surname').isLength({min: 2}),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a Valid Password').isLength({ min: 6 }),
], users.signUp)

router.post('/signIn', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 6 }),
  ], users.signIn);  

module.exports = router;


