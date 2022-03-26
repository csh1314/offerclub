
const momentService = require('../services/momentService')


class MomentController {
  async create(ctx) {
    const u_id = ctx.userInfo._id
    const moment = Object.assign({
      author: u_id,
      content: '',
      pictures: [],
      subjects: [],
      likeCount: 0,
      commentCount: 0,
      is_deleted: false
    }, ctx.request.body)
    const data = await momentService.create(moment)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        moment: data
      }
    }
  }

  async delete(ctx) {
    const u_id = ctx.userInfo._id.toString()
    const { id } = ctx.params
    const moment = await momentService.query(id)
    if(!moment || u_id !== moment.author._id.toString()) {
      const err = new Error('no moment or no auth')
      err.status = 400
      throw err
    }
    await momentService.delete(id)
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
    const moment = await momentService.query(id)
    if(!moment) {
      const err = new Error('no moment')
      err.status = 400
      throw err 
    }
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        moment
      }
    }
  }

  // TODO: list 查询列表
}

module.exports = new MomentController()