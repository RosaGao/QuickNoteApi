const express = require("express");
const router = express.Router();

const UserDao = require("../data/UserDao");
const users = new UserDao();

router.post("/register", async (req, res)=>{
  try {
    const { username, password, role } = req.body;
    const data = await users.create({ username, password, role });
    res.status(201).json({data});
  } catch (err) {
    res.status(err.status || 500).json({ message:err.message });
  }
});

router.post("/authenticate", async (req, res)=>{
  const { username, password } = req.body;
  if (!username || ! password) {
    return res.status(400).json({
      message: "You must provide both username and password!"
    });
  }

  try {
    const user = await users.readOne({ username });
    if (!user || user.password !== password) {
      // since we have code below this condition, explicitly
      // use return to break the router handler function so that 
      // the rest part will be unreachable
      // if this is the last statement, return is unnecessary
      return res.status(403).json({
        message: "Wrong username or password!"
      });
    } else {
      return res.json({ 
        message: "Authtication successful!",
        data: user,
      });
    }
  } catch(err) {
    return res.status(err.status || 500).json({
      message: err.message
    });
  }
});

module.exports = router;