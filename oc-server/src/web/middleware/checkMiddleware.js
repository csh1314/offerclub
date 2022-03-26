const userService = require('../services/userService')
const followService = require('../services/followService')
const subjectService = require('../services/subjectService')

const checkUserPutValid = async (ctx, next) => {
  const { email } = ctx.request.body
  const user = await userService.getUserByEmail(email)
  if(user) {
    const error = new Error('already has same email')
    error.status = 400
    throw error
  }
  const id = ctx.userInfo._id.toString()
  const oldUser = await userService.getUserById(id)
  for(const key in ctx.request.body) {
    if(!(key in oldUser)) {
      const error = new Error('has invalid parameter')
      error.status = 400
      throw error
    }
  }
  await next()
}

const checkFollowValid = async (ctx, next) => {
  const uid = ctx.userInfo._id
  if(uid.toString() === ctx.request.body.id) {
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


const checkSameSubject = async (ctx, next) => {
  const { content } = ctx.request.body
  const isSameSubject = await subjectService.queryContent(content)
  if(isSameSubject) {
    const error = new Error('already has same subject')
    error.status = 400
    throw error
  }
  await next()
}

module.exports = {
  checkUserPutValid,
  checkFollowValid,
  checkSameSubject
}