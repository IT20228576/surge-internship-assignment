const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");

//verify token
/**
 * It checks if the user has a token, if they do, it verifies the token and returns the user's
 * information.
 * @param req - the request object
 * @returns The result of the findById query.
 */
async function checkToken(req) {
  try {
    /* Getting the token from the cookie. */
    const token = req.cookies.token;
    /* Checking if the token is null, if it is, it returns null. */
    if (!token) return null;

    /* Verifying the token. */
    const logged = jwt.verify(token, process.env.KEY);
    /* Finding the user by the id that is in the token. */
    const result = await Users.findById(logged.user);

    return result;
  } catch (err) {
    console.error(err);
  }
}

/**
 * It checks if the token is valid and if it is a first time logged in user, it adds the user to the request body and calls the
 * next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns The result of the checkToken function.
 */
async function firstTimeAccess(req, res, next) {
  try {
    /* Checking if the user has a token, if they do, it verifies the token and returns the user's
information. */
    const result = await checkToken(req);

    /* Checking if the user is a first time logged in user. */
    if (!result || result.status === true) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    req.body.user = result;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

/**
 * It checks if the token is valid and if it is a Admin user, it adds the user to the request body and calls the
 * next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns The result of the checkToken function.
 */
async function adminAccess(req, res, next) {
  try {
    /* Checking if the user has a token, if they do, it verifies the token and returns the user's
information. */
    const result = await checkToken(req);

    /* Checking if the user is an admin. */
    if (!result || result.status === false || result.accountType !== "Admin") {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    req.body.user = result;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

/**
 * It checks if the token is valid and if it is a Student user, it adds the user to the request body and calls the
 * next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns The result of the checkToken function.
 */
async function studentAccess(req, res, next) {
  try {
    /* Checking if the user has a token, if they do, it verifies the token and returns the user's
information. */
    const result = await checkToken(req);

    /* Checking if the user is a student. */
    if (
      !result ||
      result.status === false ||
      result.accountType !== "Student"
    ) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    req.body.user = result;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = { firstTimeAccess, adminAccess, studentAccess };
