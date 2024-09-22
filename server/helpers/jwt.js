const jwt = require("jsonwebtoken");
//abis get kita verify
const getToken = (payload) => {
  return jwt.sign(payload, "lalisa")
};
const verifyToken = (token) => {
  return jwt.verify(token, "lalisa")
}

module.exports = { getToken, verifyToken }