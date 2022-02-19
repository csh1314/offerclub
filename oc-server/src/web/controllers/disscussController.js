
const disscussService = require('../services/disscussService')

class DisscussController {
  async create(ctx) {
    const u_id = ctx.userInfo._id.toString()
    const disscuss = Object.assign({ 
      u_id,
      subjects: [],
      viewCount: 0,
      likeCount: 0,
      starCount: 0,
      commentCount: 0,
      is_deleted: false
     }, ctx.request.body)
    const data = await disscussService.create(disscuss)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        disscuss: data
      }
    }
  }
}

module.exports = new DisscussController()