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
      followerUser: u_id,
      followingUser: ObjectId(target_id),
      is_deleted: false
    })
  }

  /**
   * @description 取消关注
   * @param {object} u_id 
   * @param {string} target_id 
   * @return 
   */
  async delete(u_id, target_id) {
    let data = await followTable.where({
      followerUser: u_id,
      followingUser: ObjectId(target_id),
      is_deleted: false
    }).findOne()
    data.is_deleted = true
    return await followTable.save(data)
  }

  /**
   * @description 是否已经关注
   * @param {object} u_id 
   * @param {string} target_id 
   * @return
   */
  async isFollow(u_id, target_id) {
    return await followTable.where({
      followerUser: u_id,
      followingUser: ObjectId(target_id),
      is_deleted: false
    }).findOne()
  }

  /**
   * @description 查询关注的人
   * @param {object} u_id 
   * @return {Array}
   */
  async queryFollowing(u_id) {
    return await followTable.where({followerUser:u_id, is_deleted: false})   
         .populate({
           ref: "followingUser",
           table: "user",
           projection: {
             password: 0,
             phoneNumber: 0,
             email: 0
           }
         })
         .projection({
          followingUser:1
         })
         .find()
         
  }

  /**
   * @description 查询关注我的人
   * @param {string} target_id 
   * @return {Array}
   */
   async queryFollower(target_id) {
    return await followTable.where({followingUser: ObjectId(target_id), is_deleted: false})
         .populate({
           ref: "followerUser",
           table: "user",
           projection: {
            password: 0,
            phoneNumber: 0,
            email: 0
          }
         })
         .projection({
          followerUser:1
         })
         .find()
         
  }
}

module.exports = new FollowService()