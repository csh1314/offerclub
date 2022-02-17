const userService = require('../services/userService')

const checkSameUsername = async (ctx, next) => {
  const { username } = ctx.request.body
  const user = await userService.getUserByUsername(username)
  if(user) {
    const error = new Error('already has same username')
    error.status = 400
    throw error
  }
  await next()
}

module.exports = {
  checkSameUsername
}