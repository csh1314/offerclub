const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const userTable = require('../models/userTable')

class UserService {
  
  /**
   * @description 新增用户
   * @param {object} user 
   * @return {object}
   */
  async create(user) {
    return await userTable.save(user)
  }

  /**
   * @description 通过用户名查询用户
   * @param {string} username 
   * @return {object} 
   */
  async getUserByUsername(username) {
    return await userTable.where({username}).findOne()
  }

  /**
   * @description 通过id查询用户
   * @param {string} id 
   * @return {object} 
   */
   async getUserById(id) {
    return await userTable.where({_id: ObjectId(id)}).findOne()
  }

}

module.exports = new UserService()