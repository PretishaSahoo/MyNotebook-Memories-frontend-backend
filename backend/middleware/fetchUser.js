const jwt = require('jsonwebtoken');
const JWT_SECRET = "MySecret";

const fetchUser = (req, res, next) => {
  // Get the user from the JWT token and add id to the req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Access denied, please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Access denied, please authenticate using a valid token" });
  }
};

module.exports = fetchUser;

//this middle ware is nothing but a function that will be used everytime on routes where the login is required to perform the specific task

//the work here of the next() is to call the next function given in the next parameter in the request