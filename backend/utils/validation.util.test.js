const validate = require("./validation.util");

//
// ─── TEST CREATE USER VALIDATION ───────────────────────────────────────────────────
//

//Validate correct user data
test("Validate Create User Data With Correct Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    mobile: "0112659753",
    accountType: "Admin",
    email: "test@example.com",
  };
  expect(validate.createUserSchema.validateAsync(data)).resolves.toEqual(data);
});

//Validate incomplete user data (Email)
test("Validate Create User Data With Invalid Data (Email)", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    mobile: "0112659753",
    accountType: "Admin",
    email: "invalid-email",
  };
  expect(validate.createUserSchema.validateAsync(data)).rejects.not.toEqual(data);
});

//
// ─── TEST REGISTER USER VALIDATION ───────────────────────────────────────────────────
//

//Validate register user data
test("Validate Register User Data With Correct Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    dateOfBirth: "2020-01-01",
    mobile: "0112659753",
    accountType: "Admin",
    email: "test@example.com",
    password: "123456.Password",
    passwordVerify: "123456.Password",
  };
  expect(validate.registerUserSchema.validateAsync(data)).resolves.toEqual(data);
});

//Validate incomplete user data (Password)
test("Validate Register User Data With Incomplete Data (Password)", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    dateOfBirth: "2020-01-01",
    mobile: "0112659753",
    accountType: "Admin",
    email: "invalid-email",
    password: "123456.Password",
    passwordVerify: "Wrong-Password",
  };
  expect(validate.registerUserSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});

//
// ─── TEST NOTE DATA VALIDATION ───────────────────────────────────────────────────
//

//Validate note data
test("Validate Note Data With Correct Data", () => {
  const data = {
    title: "This is the title of the note",
    description: "This is a test description",
  };
  expect(validate.noteSchema.validateAsync(data)).resolves.toEqual(data);
});

//Validate incomplete note data (Title)
test("Validate Note Data With Incomplete Data (Title)", () => {
  const data = {
    description: "This is a test description",
  };
  expect(validate.noteSchema.validateAsync(data)).rejects.not.toEqual(data);
});

//
// ─── TEST LOGIN VALIDATION ───────────────────────────────────────────────────
//

//Validate login data
test("Validate login With Correct Data", () => {
  const data = {
    email: "test@example.com",
    password: "123456.Password",
  };
  expect(validate.loginSchema.validateAsync(data)).resolves.toEqual(data);
});

//Validate incomplete login data (Email)
test("Validate login Data With Incomplete Data (email)", () => {
  const data = {
    email: "invalid Email",
    password: "123456.Password",
  };
  expect(validate.loginSchema.validateAsync(data)).rejects.not.toEqual(data);
});
