const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobile: { type: Number, required: true },
    status: { type: Boolean, default: false },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
