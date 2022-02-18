
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
}

module.exports = new FollowController()