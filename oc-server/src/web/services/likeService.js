const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const likeTable = require('../models/likeTable')

class LikeService {
  /**
   * @description 点赞
   * @param {object} like 
   * @return 
   */
  async create(comment) {
    return await likeTable.save(comment)
  }

  /**
   * @description 查询是否点赞
   * @param {object} user 
   * @param {object} target 
   */
  async query(user, target) {
    return await likeTable.where({ user, target, is_deleted: false }).findOne()
  }

  /**
   * @description 逻辑删除点赞 (取消点赞)
   * @param {object} user 
   * @param {object} target 
   */
   async delete(user, target) {
    const like = await likeTable.where({ user, target, is_deleted: false }).findOne()
    like.is_deleted = true
    return await likeTable.save(like)
  }
}

module.exports = new LikeService()