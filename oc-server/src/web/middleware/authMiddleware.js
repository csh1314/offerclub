const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../../app/config')
const userService = require('../services/userService')

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error('no token')
    error.status = 401
    throw error
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    const { id } = result;
    const userInfo = await userService.getUserById(id);
    ctx.userInfo = userInfo;
    ctx.token = authorization;
  } catch (err) {
    const error = new Error('invalid token');
    error.status = 401;
    throw error
  }
  await next()
}

module.exports = {
  verifyAuth
}