const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const followTable = require('../models/followTable')

class FollowService {
  /**
   * @description 关注
   * @param {string} u_id 
   * @param {string} target_id 
   * @return 
   */
  async create(u_id, target_id) {
    return await followTable.save({
      u_id,
      target_id,
      is_deleted: false
    })
  }

  /**
   * @description 取消关注
   * @param {string} u_id 
   * @param {string} target_id 
   * @return 
   */
  async delete(u_id, target_id) {
    let data = await followTable.where({u_id, target_id, is_deleted: false}).findOne()
    data.is_deleted = true
    return await followTable.save(data)
  }

  /**
   * @description 是否已经关注
   * @param {string} u_id 
   * @param {string} target_id 
   * @return
   */
  async isFollow(u_id, target_id) {
    return await followTable.where({u_id, target_id, is_deleted: false}).findOne()
  }

  /**
   * @description 查询关注的人
   * @param {string} u_id 
   * @return {Array}
   */
  async query(u_id) {
    return await followTable.where({u_id:ObjectId(u_id), is_deleted: false}).find()
  }
}

module.exports = new FollowService()