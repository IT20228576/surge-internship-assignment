const router = require("express").Router();
const Notes = require("../models/notes.model");
const { studentAccess } = require("../middleware/accessManager");
const validation = require("../utils/validation.util");

/* The below code is a route handler for the /create route. It is used to create a new note. */
router.post("/create", studentAccess, async (req, res) => {
  try {
    /* Destructuring the _id property from the user object in the request body. */
    const { _id } = req.body.user;

    /* Validating the request body. */
    const validated = await validation.noteSchema.validateAsync(req.body);

    /* Checking if the note title is already in the database. */
    const note = await Notes.findOne({ title: validated.title });
    if (note)
      return res.status(400).json({
        errorMessage: "An note with this title already exists.",
      });

    // save a new note account to the db
    const newNote = new Notes({
      studentId: _id,
      title: validated.title,
      description: validated.description,
    });

    /* Saving the new note to the database. */
    await newNote.save();

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully created a new note" });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the / route. It is used to get all the notes of current loggedin users. */
router.get("/all", studentAccess, async (req, res) => {
  try {
    /* Destructuring the _id property from the user object in the request body. */
    const { _id } = req.body.user;

    /* Destructuring the page and size properties from the query object in the request object. */
    let { page, size } = req.query;

    /* Checking if the page and size properties are present in the query object in the request object.
    If not, it is setting the default values. */
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    /* Finding all the notes in the database. */
    const notes = await Notes.find({ studentId: _id })
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    /* count total notes belongs to current user in the database. */
    let total = await Notes.countDocuments({ studentId: _id });
    total = parseInt(total / size + 1);

    /* Sending the notes object to the client. */
    res.json({ notes: notes , total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* A route handler for a PUT request to the /update endpoint. It is used to update note. */
router.put("/update/:id", studentAccess, async (req, res) => {
  try {
    /* Destructuring the id property from the params object in the request object. */
    const { id } = req.params;

    /* Validating the request body against the schema defined in the `validation.util.js` file. */
    const validated = await validation.noteSchema.validateAsync(req.body);

    /* Updating the note with the id passed in the request params. */
    await Notes.findByIdAndUpdate(id, {
      title: validated.title,
      description: validated.description,
    }).exec();

    /* Sending the result to the client. */
    res.status(201).send({ Message: "Successfully updated" });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* A route handler for a DELETE request to the /delete endpoint. It is used to delete note. */
router.delete("/delete/:id", studentAccess, async (req, res) => {
  try {
    /* Destructuring the id from the request body. */
    const { id } = req.params;

    /* Deleting the staff member with the given id. */
    await Notes.findByIdAndDelete(id);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully deleted" });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
