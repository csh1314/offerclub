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
}

module.exports = new DisscussService()