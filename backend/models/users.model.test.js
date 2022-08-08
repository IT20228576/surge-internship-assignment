const Users = require("./users.model");

test("adding incomplete user data (Email) to the database and return an error", async () => {
  const incompleteData = new Users({
    firstName: "Kamal",
    lastName: "Perera",
    dateOfBirth: "2020-01-01",
    mobile: "0112659753",
    accountType: "Admin",
    password: "123456.Password",
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.email).toBeDefined();
  }
});
