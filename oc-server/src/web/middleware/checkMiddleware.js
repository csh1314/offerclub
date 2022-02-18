const userService = require('../services/userService')
const followService = require('../services/followService')

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

const checkFollowValid = async (ctx, next) => {
  const uid = ctx.userInfo._id.toString()
  if(uid === ctx.request.body.id) {
    const error = new Error('can not follow yourself')
    error.status = 400
    throw error
  }
  const isFollow = await followService.isFollow(uid, ctx.request.body.id)
  if(isFollow) {
    const error = new Error('already follow')
    error.status = 400
    throw error
  }
  await userService.getUserById(ctx.request.body.id)
  await next()
}

module.exports = {
  checkSameUsername,
  checkFollowValid
}