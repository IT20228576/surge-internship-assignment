const Joi = require("joi").extend(require("@joi/date"));
const passwordComplexity = require("joi-password-complexity");

/* A schema for validating the create user form. */
const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).label("Name"),
  lastName: Joi.string().min(2).max(15).label("Name"),
  dateOfBirth: Joi.date().format("YYYY-MM-DD").label("DoB"),
  mobile: Joi.string().length(10).label("Mobile"),
  accountType: Joi.string()
    .valid("Admin", "Student")
    .required()
    .label("Account Type"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
}).unknown(true);

/* A schema for validating the register user form. */
const registerUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).required().label("Name"),
  lastName: Joi.string().min(2).max(15).required().label("Name"),
  dateOfBirth: Joi.date().format("YYYY-MM-DD").required().label("DoB"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: passwordComplexity().required().label("Password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("Password Verify"),
}).unknown(true);

/* This is a schema for validating the login form. */
const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: Joi.string().required().label("Password"),
});

/* This is a schema for validating the create note form. */
const noteSchema = Joi.object({
  title: Joi.string().min(3).required().label("title"),
  description: Joi.string().min(3).required().label("description"),
}).unknown(true);

module.exports = {
  createUserSchema,
  registerUserSchema,
  loginSchema,
  noteSchema,
};
