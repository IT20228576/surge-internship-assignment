const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

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
app.listen(PORT, () => console.log(`Successfully Server started on : ${PORT}`));

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());

/* Parsing the cookie and making it available in the req.cookies property. */
app.use(cookieParser());

/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

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
app.use(require("./routes/login.routes"));
app.use("/notes", require("./routes/notes.routes"));
