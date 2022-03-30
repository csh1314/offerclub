const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const starTable = require('../models/starTable')

class LikeService {
  /**
   * @description 收藏
   * @param {object} star
   * @return 
   */
  async create(star) {
    return await starTable.save(star)
  }

  /**
   * @description 查询是否收藏
   * @param {object} user 
   * @param {object} disscuss 
   */
  async query(user, disscuss) {
    return await starTable.where({ user, disscuss, is_deleted: false }).findOne()
  }

  /**
   * @description 逻辑删除收藏 (取消收藏)
   * @param {object} user 
   * @param {object} disscuss 
   */
   async delete(user, disscuss) {
    const star = await starTable.where({ user, disscuss, is_deleted: false }).findOne()
    star.is_deleted = true
    return await starTable.save(star)
  }
}

module.exports = new LikeService()