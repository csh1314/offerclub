const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const viewService = require('../services/viewService')
const disscussService = require('../services/disscussService')

class ViewController {
  async create(ctx) {
    const u_id = ctx.userInfo._id
    const { id } = ctx.params
    const view = {
      viewer: u_id,
      disscuss: ObjectId(id)
    }
    const disscuss = await disscussService.query(id)
    if(!disscuss) {
      const err = new Error('no disscuss')
      err.status = 400
      throw err
    }
    const isViewed = await viewService.query(view)
    if(isViewed) {
      ctx.body = {
        code: 201,
        message: "success",
        data: {}
      }
      return
    }
    const data = await viewService.create(view)
    await disscussService.addCount(id, 'view')
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        data
      }
    }
  }

}

module.exports = new ViewController()