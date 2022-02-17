const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../app/config')

module.exports = function handleGenerateToken(user, expiresIn = 60 * 60 * 24 * 7) {
  return jwt.sign(user, PRIVATE_KEY, {
    expiresIn,
    algorithm: "RS256"
  })
}