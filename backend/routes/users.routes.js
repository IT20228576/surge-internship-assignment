const router = require("express").Router();
const Users = require("../models/users.model");
const crypto = require("crypto");
const Email = require("../utils/email.util");
const bcrypt = require("bcryptjs");
const { firstTimeAccess, adminAccess } = require("../middleware/accessManager");

/* The below code is a route handler for the /create route. It is used to create a new User. */
router.post("/create", adminAccess, async (req, res) => {
  try {
    /* Destructuring the request body. */
    const { firstName, lastName, email, dateOfBirth, mobile, accountType } =
      req.body;

    /* Checking if the email is already in the database. */
    const user = await Users.findOne({ email: email });
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    const id = Math.random().toString(8).substring(5, 15);
    const oneTimePassword = crypto.randomBytes(10).toString("hex");

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(oneTimePassword, salt);

    // save a new user account to the db
    const newUser = new Users({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dateOfBirth,
      mobile: mobile,
      password: hashedPassword,
      accountType: accountType,
    });

    /* Saving the new user to the database. */
    const savedUser = await newUser.save();

    /* Sending an verification email to the user. */
    await Email.sendVerification(savedUser.email, oneTimePassword);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully created a new user" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* The below code is a route handler for the /register route. It is used to register new User. */
router.put("/register", firstTimeAccess, async (req, res) => {
  try {
    /* Destructuring the request body. */
    const { firstName, lastName, email, dateOfBirth, mobile, password } =
      req.body;

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const id = req.body.user;

    // save a new user account to the db
    await Users.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dateOfBirth,
      mobile: mobile,
      status: true,
      password: hashedPassword,
    }).exec();

    /* Sending a response to the client. */

    /* Deleting the cookie. */
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send({ Message: "Successfully registered, Please log in." });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/", adminAccess, async (req, res) => {
  try {
    /* Finding all the users in the database. */
    const users = await Users.find();
    /* Sending the users object to the client. */
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
