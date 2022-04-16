const express = require("express");
const db = require("./data/db");
const notes = require("./routes/notes");
const users = require("./routes/users");
const auth = require("./routes/auth");

db.connect();

const app = express();
app.use(express.json()); // allow Express to parse the request body
const port = process.env.PORT || 3000;

app.use(notes); // use "notes" routes
app.use(users); // use "users" routes to interact with db
app.use(auth);

app.get("/", (_request, response)=>{
  response.send("quick-note app api");
});

app.listen(port, ()=>{
  console.log(`Express app listening at port ${port}`);
});
