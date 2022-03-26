const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const commentService = require('../services/commentService')

class CommentController {
  async create(ctx) {
    const u_id = ctx.userInfo._id
    // 前端必须传入: type: disscuss/moment,  target: id (目标表的objectId)
    const comment = Object.assign({
      author: u_id,
      content: '',
      likeCount: 0,
      is_deleted: false,
    }, ctx.request.body)
    if(!('type' in comment) || !('target' in comment)) {
      const err = new Error('must have type & target')
      err.status = 400
      throw err
    }
    if(comment.type !== 'moment' && comment.type !== 'disscuss') {
      const err = new Error('wrong type')
      err.status = 400
      throw err
    }
    if ('replyComment' in comment) {
      comment.replyComment = ObjectId(comment.replyComment)
    } else {
      comment.replyComment = null
    }
    comment.target = ObjectId(comment.target)
    const data = await commentService.create(comment)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        comment: data
      }
    }
  }

  async delete(ctx) {
    const u_id = ctx.userInfo._id.toString()
    const { id } = ctx.params
    const comment = await commentService.query(id)
    if(!comment || u_id !== comment.author._id.toString()) {
      const err = new Error('no comment or no auth')
      err.status = 400
      throw err
    }
    await commentService.delete(id)
    ctx.body = {
      code: 200,
      mesage: "success",
      data: {
        isDeleted: true
      }
    }
  }

  async list(ctx) {
    const { type, target } = ctx.params
    const commentList = await commentService.list(type, target)
    ctx.body = {
      code: 200,
      mesage: "success",
      data: {
        commentList
      }
    }
  }
}

module.exports = new CommentController()