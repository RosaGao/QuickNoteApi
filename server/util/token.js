const jwt = require("jsonwebtoken");

const createToken = (user) =>{
  return jwt.sign(
    {
      sub: user._id, // subject claim, set as user id
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET, // we would store generated token (public key)
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
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] },
      (err, _decoded)=>{
        if (err) {
          resolve(false); // if time expires, also resolves to false
        } else {
          resolve(true);
        }
      }
    )
  });
};

const decodeToken = (token) =>{
  const decoded = jwt.decode(token);
  return decoded;
}



module.exports = {
  createToken,
  verifyToken,
  decodeToken
};