const express = require("express");
const router = express.Router();

const UserDao = require("../data/UserDao");
const users = new UserDao();

const { verifyPassword } = require("../util/hasing");
const { createToken, verifyToken } = require("../util/token");



router.post("/register", async (req, res)=>{
  try {
    const { username, password } = req.body;
    const data = await users.create({ username, password, role: "CLIENT" });
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
    // readOne must use findOne, returning one object
    // find returns an array
    const user = await users.readOne(username);
    const isAuthenticated = await verifyPassword(password, user ? user.password : "");
    if (!isAuthenticated) {
      // since we have code below this condition, explicitly
      // use return to break the router handler function so that 
      // the rest part will be unreachable
      // if this is the last statement, return is unnecessary
      return res.status(403).json({
        message: "Wrong username or password!"
      });
    } else {
      const token = createToken(user);
      return res.json({ 
        message: "Authtication successful!",
        token: token,
      });
    }
  } catch(err) {
    return res.status(err.status || 500).json({
      message: err.message
    });
  }
});

router.post("/verify", async (req, res)=>{
  const { token } = req.body;
  const isValid = await verifyToken(token);

  if (!isValid) {
    return res.status(403).json({
      message: "Invalid or expired token!",
    });
  }

  return res.json({
    message: "Token verified and is valid!",
    token: token,
  });
})





module.exports = router;