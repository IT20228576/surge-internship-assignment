const router = require("express").Router();
const Users = require("../models/users.model");
const crypto = require("crypto");
const Email = require("../utils/email.util");
const bcrypt = require("bcryptjs");
const { firstTimeAccess, adminAccess } = require("../middleware/accessManager");
const validation = require("../utils/validation.util");

/* The below code is a route handler for the /create route. It is used to create a new User. */
router.post("/create", adminAccess, async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.createUserSchema.validateAsync(req.body);

    /* Checking if the email is already in the database. */
    const user = await Users.findOne({ email: validated.email });
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    /* Generating a random string of length 10. */
    const id = Math.random().toString(8).substring(5, 15);
    /* Generating a random string of length 10. */
    const oneTimePassword = crypto.randomBytes(10).toString("hex");

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(oneTimePassword, salt);

    // save a new user account to the db
    const newUser = new Users({
      id: id,
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      dateOfBirth: validated.dateOfBirth,
      mobile: validated.mobile,
      password: hashedPassword,
      accountType: validated.accountType,
    });

    /* Saving the new user to the database. */
    const savedUser = await newUser.save();

    /* Sending an verification email to the user. */
    await Email.sendVerification(savedUser.email, oneTimePassword);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully created a new user" });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* The below code is a route handler for the /register route. It is used to register new User. */
router.put("/register", firstTimeAccess, async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.registerUserSchema.validateAsync(
      req.body
    );

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(validated.password, salt);

    /* Getting the user id from the request body. */
    const id = req.body.user;

    // save user details to the db
    await Users.findByIdAndUpdate(id, {
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      dateOfBirth: validated.dateOfBirth,
      mobile: validated.mobile,
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
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/all", adminAccess, async (req, res) => {
  try {
    /* Destructuring the query parameters. */
    let { page, size } = req.query;

    /* Checking if the page and size query parameters are not present, then it is setting the default
    values. */
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    /* Finding all the users in the database. */
    const users = await Users.find()
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    /* Sending the users object to the client. */
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
