const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

/* A schema for validating the create user form. */
const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).label("First Name"),
  lastName: Joi.string().min(2).max(15).label("Last Name"),
  dateOfBirth: Joi.string().label("Date Of Birth"),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .label("Mobile"),
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
  firstName: Joi.string().min(2).max(15).required().label("First Name"),
  lastName: Joi.string().min(2).max(15).required().label("Last Name"),
  dateOfBirth: Joi.string().required().label("Date Of Birth"),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .label("Mobile"),
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
  title: Joi.string().min(3).required().label("Title"),
  description: Joi.string().min(3).required().label("Description"),
}).unknown(true);

module.exports = {
  createUserSchema,
  registerUserSchema,
  loginSchema,
  noteSchema,
};
