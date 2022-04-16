const express = require("express");
const db = require("./data/db");
const notes = require("./routes/notes");
const users = require("./routes/users");

db.connect();

const app = express();
app.use(express.json()); // allow Express to parse the request body
const port = process.env.PORT || 3000;

app.use(notes);
app.use(users);

app.get("/", (_request, response)=>{
  response.send("quick-note app api");
});

app.listen(port, ()=>{
  console.log(`Express app listening at port ${port}`);
});
