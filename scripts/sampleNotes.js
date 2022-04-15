const db = require("../server/data/db");
const faker = require("faker");
const NoteDao = require("../server/data/NoteDao");

async function createSampleNotes() {
  try {
    await db.connect();

    const notes = new NoteDao();
    const note = notes.create({
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
    });
    console.log(note);
  } catch (err) {
    console.log(err);
  }
}

createSampleNotes();
