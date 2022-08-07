const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    mobile: { type: Number },
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
