const router = require("express").Router();
const Users = require("../models/users.model");
const crypto = require("crypto");
const Email = require("../utils/email.util");

/* The above code is a route handler for the /register route. It is used to register a new User. */
router.post("/create", async (req, res) => {
  try {
    /* Destructuring the request body. */
    const { firstName, lastName, email, dateOfBirth, mobile, accountType } =
      req.body;

    const id = Math.random().toString(8).substring(5, 15);
    const oneTimePassword = crypto.randomBytes(10).toString("hex");

    // save a new user account to the db
    const newUser = new Users({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dateOfBirth,
      mobile: mobile,
      password: oneTimePassword,
      accountType: accountType,
    });

    /* Saving the new user to the database. */
    const savedUser =  await newUser.save();

    /* Sending an verification email to the user. */
    await Email.sendVerification(savedUser.email, oneTimePassword);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully created new user" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/", async (req, res) => {
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
