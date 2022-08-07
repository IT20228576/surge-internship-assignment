const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

/* Loading the environment variables from the .env file. */
dotenv.config();

//
// ─── SET UP SERVER ──────────────────────────────────────────────────────────────
//

/* Creating an instance of express. */
const app = express();

/* Setting the port to 8000. */
const PORT = process.env.PORT || 8000;

/* Starting the server on the port 8000. */
app.listen(PORT, () =>
  console.log(`Successfully Server started on : ${PORT}`)
);

/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());

//
// ─── CONNECTION TO MONGODB ─────────────────────────────────────────────────────────
//

mongoose.connect(
  process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

//
// ─── SET UP ROUTES ──────────────────────────────────────────────────────────────
//

//User management routes
app.use("/users", require("./routes/users.routes"));


