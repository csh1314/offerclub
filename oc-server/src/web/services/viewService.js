const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const viewTable = require('../models/viewTable')

class ViewService {
  
  /**
   * @description 浏览讨论
   * @param {object} view
   * @return {object}
   */
  async create(view) {
    return await viewTable.save(view)
  }

  /**
   * @description 是否浏览过
   * @param {object} view 
   * @returns 
   */
  async query(view) {
    return await viewTable.where(view).findOne()
  }
}

module.exports = new ViewService()