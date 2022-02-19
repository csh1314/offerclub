const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const disscussTable = require('../models/disscussTable')

class DisscussService {
  /**
   * @description 发布讨论
   * @param {object} disscuss 
   * @return 
   */
  async create(disscuss) {
    return await disscussTable.save(disscuss)
  }

  /**
   * @description 查询帖子
   * @param {string} id 
   */
  async query(id) {
    return await disscussTable.where({_id: ObjectId(id), is_deleted:false}).findOne()
  }

  /**
   * @description 逻辑删除帖子
   * @param {string} id 
   */
  async delete(id) {
    let disscuss = await disscussTable.where({_id: ObjectId(id)}).findOne()
    disscuss.is_deleted = true
    return await disscussTable.save(disscuss)
  }

  /**
   * @description 更新帖子
   * @param {object} disscuss
   * @return {object} 
   */
  async update(disscuss) {
    const { id } = disscuss
    let data = await disscussTable.where({_id: ObjectId(id)}).findOne()
    delete disscuss.id
    data = Object.assign(data, disscuss)
    return await disscussTable.save(data)
  }
}

module.exports = new DisscussService()