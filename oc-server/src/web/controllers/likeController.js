const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const likeService = require('../services/likeService')
const disscussService = require('../services/disscussService')
const momentService = require('../services/momentService')
const commentService = require('../services/commentService')

class LikeController {
  async create(ctx) {
    const u_id = ctx.userInfo._id
    const like = Object.assign({
      user: u_id,
      is_deleted: false,
    }, ctx.request.body)
    if(!('type' in like) || !('target' in like)) {
      const err = new Error('must have type & target')
      err.status = 400
      throw err
    }
    like.target = ObjectId(like.target)
    const isLike = await likeService.query(like.user, like.target)
    if(isLike) {
      const err = new Error('already like')
      err.status = 400
      throw err
    }
    switch(like.type) {
      case 'disscuss':
        await disscussService.addCount(like.target.toString(), 'like')
        break
      case 'moment':
        await momentService.addCount(like.target.toString(), 'like')
        break
      case 'comment':
        await commentService.addLikeCount(like.target.toString())
        break
      default:
        const err = new Error('wrong type')
        err.status = 400
        throw err
    }
    await likeService.create(like)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        isLike: true
      }
    }
  }

  async delete(ctx) {
    const user = ctx.userInfo._id
    const req = ctx.request.body
    if(!('type' in req) || !('target' in req)) {
      const err = new Error('must have type & target')
      err.status = 400
      throw err
    }
    const target = ObjectId(req.target)
    const isLike = await likeService.query(user, target)
    if(!isLike) {
      const err = new Error('no like record')
      err.status = 400
      throw err
    }
    switch(req.type) {
      case 'disscuss':
        await disscussService.subLikeCount(target)
        break
      case 'moment':
        await momentService.subLikeCount(target)
        break
      case 'comment':
        await commentService.subLikeCount(target)
        break
      default:
        const err = new Error('wrong type')
        err.status = 400
        throw err
    }
    await likeService.delete(user, target)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        isLike: false
      }
    }
  }
}

module.exports = new LikeController()