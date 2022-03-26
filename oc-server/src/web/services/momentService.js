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
    let moment = await momentTable.where({_id: ObjectId(id)}).findOne()
    moment.is_deleted = true
    return await momentTable.save(moment)
  }
}

module.exports = new DisscussService()