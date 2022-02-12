const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../../app/config')
const userService = require('../services/userService')

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error('用户未登录')
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
    const error = new Error('登录状态过期');
    error.status = 401;
    throw error
  }
  try {
    await next();
  } catch (err) {
    const error = new Error('客户端错误');
    error.status = 400;
    throw error
  }


}

module.exports = {
  verifyAuth
}