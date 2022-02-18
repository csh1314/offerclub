
const followService = require('../services/followService')
const userService = require('../services/userService')

class FollowController {
  async create(ctx) {
    const uid = ctx.userInfo._id.toString()
    await followService.create(uid, ctx.request.body.id) 
    await userService.follow(uid, ctx.request.body.id)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        isFollow: true
      }
    }
  }

  async delete(ctx) {
    const uid = ctx.userInfo._id.toString()
    const isFollow = await followService.isFollow(uid, ctx.request.body.id)
    if(!isFollow) {
      const err = new Error('does not follow')
      err.status = 400
      throw err
    } 
    await followService.delete(uid, ctx.request.body.id)
    await userService.unFollow(uid, ctx.request.body.id)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        isFollow: false
      }
    }
  }
}

module.exports = new FollowController()