const jwt = require("jsonwebtoken");

const createToken = (user) =>{
  return jwt.sign(
    {
      sub: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWR_SECRET, // we would store generated token
    {                       // as JWR_SECRET in the .env file
      algorithm: "HS256",   // never hard-code secrets into codebase
      expiresIn: "2d",
    }
  );
};

const verifyToken = (token) =>{
  return new Promise((resolve, reject)=>{
    jwt.verify(
      token,
      process.env.JWR_SECRET,
      { algorithms: ["HS256"] },
      (err, _decoded)=>{
        if (err) {
          reject(false); // if time expires, also resolves false
        } else {
          resolve(true);
        }
      }
    )
  });
};

module.exports = {
  createToken,
  verifyToken,
};