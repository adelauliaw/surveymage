const bcrypt = require('bcryptjs');


function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

function comparePassword(password, hash) {
  const compare = bcrypt.compareSync(password, hash)
  return compare
}

module.exports = { hashPassword, comparePassword }