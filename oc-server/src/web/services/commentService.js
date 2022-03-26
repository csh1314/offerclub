const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const commentTable = require('../models/commentTable')

class CommentService {
  /**
   * @description 发布评论
   * @param {object} comment 
   * @return 
   */
  async create(comment) {
    return await commentTable.save(comment)
  }

  /**
   * @description 查询某条评论
   * @param {string} id 
   */
   async query(id) {
    return await commentTable.where({_id: ObjectId(id), is_deleted:false})
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
   * @description 逻辑删除评论
   * @param {string} id 
   */
   async delete(id) {
    let comment = await commentTable.where({_id: ObjectId(id)}).findOne()
    comment.is_deleted = true
    return await commentTable.save(comment)
  }

  /**
   * @description 获取评论列表
   * @param {string} type 目标表 
   * @param {string} target  目标表的id
   */
  async list(type, target) {
    return await commentTable.where({type, target: ObjectId(target), is_deleted:false})
          .populate({
            ref: "author",
            table: "user",
            projection: {
            password: 0,
            phoneNumber: 0,
            email: 0
          }
          })   
          .find()
  }
}

module.exports = new CommentService()