const express = require("express");
const faker = require("faker");
const NoteDao = require("./data/NoteDao");

const NUM_SAMPLES = 3;
const notes = new NoteDao();
for(let i = 0; i < NUM_SAMPLES; i++) {
  notes.create({
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
  });
}


const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request, response)=>{
  response.send("api app!");
});

app.listen(port, ()=>{
  console.log(`Express app listening at port ${port}`);
});

