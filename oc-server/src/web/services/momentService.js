const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const momentTable = require('../models/momentTable')

class DisscussService {
  /**
   * @description 发布动态
   * @param {object} moment 
   * @return 
   */
  async create(moment) {
    return await momentTable.save(moment)
  }

  /**
   * @description 查询动态
   * @param {string} id 
   */
   async query(id) {
    return await momentTable.where({_id: ObjectId(id), is_deleted:false})
         .populate({
           ref: "author",
           table: "user",
           projection: {
            password: 0,
            phoneNumber: 0,
            email: 0
          }
         })
         .findOne()
  }

  /**
   * @description 逻辑删除动态
   * @param {string} id 
   */
   async delete(id) {
    let moment = await momentTable.where({_id: ObjectId(id), is_deleted:false}).findOne()
    moment.is_deleted = true
    return await momentTable.save(moment)
  }

  /**
   * @description 点赞数/评论数
   * @param {string} id 
   * @param {string} type 
   * @returns 
   */
   async addCount(id, type) {
    const moment = await momentTable.where({_id: ObjectId(id), is_deleted:false}).findOne()
    if(!moment) {
      const err = new Error('wrong target')
      err.status = 400
      throw err
    }
    switch(type) {
      case 'like':
        moment.likeCount++
        break
      case 'comment':
        moment.commentCount++
        break
      default:
        throw new Error('wrong type')
    }
    return await momentTable.save(moment)
  }

  /**
   * @description 评论数-1
   * @param {object} _id 
   */
   async subCommentCount(_id) {
    const moment = await momentTable.where({_id, is_deleted:false}).findOne()
    if(!moment) {
      const err = new Error('wrong target')
      err.status = 400
      throw err
    }
    moment.commentCount = Math.max(0, moment.commentCount-1)
    return await momentTable.save(moment)
  }

  /**
   * @description 点赞数-1
   * @param {object} _id 
   */
   async subLikeCount(_id) {
    const moment = await momentTable.where({_id, is_deleted:false}).findOne()
    if(!moment) {
      const err = new Error('wrong target')
      err.status = 400
      throw err
    }
    moment.likeCount = Math.max(0, moment.likeCount-1)
    return await momentTable.save(moment)
  }
}

module.exports = new DisscussService()