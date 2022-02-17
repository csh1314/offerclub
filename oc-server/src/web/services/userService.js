const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const userTable = require('../models/userTable')

class UserService {
  
  /**
   * @description 新增用户
   * @param {object} 
   * @return {object}
   */
  async create(user) {
    return await userTable.save(user)
  }

  /**
   * @description 修改密码
   * @param {object}  
   * @return {object}
   */
  async patch({username, password, newPassword}) {
    const user = await userTable.where({username, password}).findOne()
    user.password = newPassword
    return await userTable.save(user)
  }

  /**
   * @description 修改用户信息
   * @param {object} userInfo 
   * @return {object} 
   */
  async put(userInfo) {
    const { _id } = userInfo
    let user = await userTable.where({_id}).findOne()
    user = Object.assign(user, userInfo)
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

  /**
   * @description 上传头像
   * @param {object} 
   * @return {object}
   */
  async uploadAvatar({id, url}) {
    let user = await userTable.where({_id: id}).findOne()
    user = Object.assign(user, {avatarUrl: url})
    return await userTable.save(user)
  }

  /**
   * @description 手机号获取用户
   * @param {string} phoneNumber
   * @return {object} 
   */
  async getUserByPhone(phoneNumber) {
    return await userTable.where({phoneNumber}).findOne()
  }
}

module.exports = new UserService()