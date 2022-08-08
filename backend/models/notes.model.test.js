const Notes = require("./notes.model");

test("adding incomplete note data (studentId) to the database and return an error", async () => {
  const incompleteData = new Notes({
    title: "This is the title of the note",
    description: "This is a test description",
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.studentId).toBeDefined();
  }
});
