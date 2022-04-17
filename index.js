

const app = require("./server");
const db = require("./server/data/db");

db.connect();

const port = `${process.env.PORT}` || 3000;

app.listen(port, ()=>{
  console.log(`Express app listening at port: http://localhost:${port}/`);
});