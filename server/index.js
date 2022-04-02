const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request, response)=>{
  response.send("api app!");
});

app.listen(port, ()=>{
  console.log(`Express app listening at port ${port}`);
});

