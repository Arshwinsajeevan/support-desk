const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // Read token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  try {
    // Verify and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
