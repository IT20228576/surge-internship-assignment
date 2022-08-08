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
    const token = req.cookies.token;
    if (!token) return null;

    const logged = jwt.verify(token, process.env.KEY);
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
    const result = await checkToken(req);

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

module.exports = { firstTimeAccess };
