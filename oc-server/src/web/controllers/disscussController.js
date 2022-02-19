
const disscussService = require('../services/disscussService')
const userService = require('../services/userService')
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

  async delete(ctx) {
    const u_id = ctx.userInfo._id.toString()
    const { id } = ctx.params
    const disscuss = await disscussService.query(id)
    if(!disscuss || u_id !== disscuss.u_id) {
      const err = new Error('no disscuss or no auth')
      err.status = 400
      throw err
    }
    await disscussService.delete(id)
    ctx.body = {
      code: 200,
      mesage: "success",
      data: {
        isDeleted: true
      }
    }
  }

  async query(ctx) {
    const { id } = ctx.params
    const disscuss = await disscussService.query(id)
    if(!disscuss) {
      const err = new Error('no disscuss')
      err.status = 400
      throw err 
    }
    const { u_id } = disscuss
    const author = await userService.getUserById(u_id)
    delete author.phoneNumber
    delete author.email
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        author,
        disscuss
      }
    }
  }
}

module.exports = new DisscussController()