const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const starService = require('../services/starService')
const disscussService = require('../services/disscussService')

class StarController {
  async create(ctx) {
    const user = ctx.userInfo._id
    const star = Object.assign({
      user,
      is_deleted: false,
    }, ctx.request.body)
    if(!'disscuss' in star) {
      const err = new Error('must have disscuss')
      err.status = 400
      throw err
    }
    star.disscuss = ObjectId(star.disscuss)
    const isStar = await starService.query(user, star.disscuss)
    if(isStar) {
      const err = new Error('already star')
      err.status = 400
      throw err
    }
    await starService.create(star)
    await disscussService.addCount(star.disscuss.toString(), 'star')
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        isStar: true
      }
    }
  }

  async delete(ctx) {
    const user = ctx.userInfo._id
    const req = ctx.request.body
    if(!'disscuss' in req) {
      const err = new Error('must have disscuss')
      err.status = 400
      throw err
    }
    const disscuss = ObjectId(req.disscuss)
    const isStar = await starService.query(user, disscuss)
    if(!isStar) {
      const err = new Error('is not stared')
      err.status = 400
      throw err
    }
    await starService.delete(user, disscuss)
    await disscussService.subStarCount(disscuss)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        isStar: false
      }
    }
  }
}

module.exports = new StarController()