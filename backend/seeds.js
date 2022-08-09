const mongoose = require("mongoose");
const Users = require("./models/users.model");

/* Connecting to the MongoDB database. */

mongoose.connect(
  "mongodb+srv://jay:wan05Og7Kkfky2G4@cluster0.3zo0hdv.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

/* Creating an array of admin objects. */
const seedAdmins = [
  {
    id: "1556526364",
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    dateOfBirth: "2015-01-01",
    mobile: "0112659753",
    status: true,
    password: "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
    accountType: "Admin",
  },
  {
    id: "42455645454",
    firstName: "Michael",
    lastName: "Walker",
    email: "Michael@Walker.com",
    dateOfBirth: "1997-10-01",
    mobile: "0116856566",
    status: true,
    password: "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
    accountType: "Admin",
  },
];

/**
 * Delete all users, then insert the seedAdmins array into the database.
 */
const seedDB = async () => {
  try {
    await Users.deleteMany({});
    await Users.insertMany(seedAdmins);
    console.log("Successfully admins seeded to the database.");
  } catch (error) {
    console.error(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
