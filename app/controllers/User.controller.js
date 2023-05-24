const User = require("../models/User.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const firebase = require("../config/firebase");

// Sign-up
const signUp = async (req, res) => {
  // Check Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Firebase Sign-up
  const { email, password, first_name, last_name } = req.body;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password, first_name, last_name)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Firebase - Successfully created new user:", user.uid);
    })
    .catch((error) => {
      console.log("Firebase - Error creating new user:", error);
    });

  // MongoDB Sign-up
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res.send(
      "Email already exists! Please try with a different email address."
    );
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user in MongoDB with hashed password
  const user = await User.create({
    email,
    password: hashedPassword,
    first_name,
    last_name,
  });

  return res.status(200).json({ message: "User signed up successfully" });
};

// Sign-in
const signIn = async (req, res) => {
  // Check Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Firebase Sign-in
  const { email, password } = req.body;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Firebase - Successfully signed in:", user.uid);
    })
    .catch((error) => {
      console.log("Firebase - Error signing in:", error);
    });

  // MongoDB Sign-in
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({ message: "User signed in successfully" });
};

module.exports = {
  signUp,
  signIn,
};
