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
   * @description 通过id查询用户
   * @param {string} id 
   * @return {object} 
   */
   async getUserById(id) {
    let user = null
    try {
      user = await userTable.where({_id: ObjectId(id)}).findOne()
    } catch (error) {
      const err = new Error('invalid id')
      err.status = 400
      throw err
    }
    delete user.password
    return user
  }

  /**
   * @description 通过邮箱查询用户
   * @param {string} email 
   * @return {object}
   */
   async getUserByEmail(email) {
    return await userTable.where({email}).findOne()
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
  /**
   * @description 关注
   * @param {string} u_id 
   * @param {string} target_id 
   * @return
   */
  async follow(u_id, target_id) {
    const user = await userTable.where({_id:ObjectId(u_id)}).findOne()
    user.followingCount += 1
    await userTable.save(user)
    const target = await userTable.where({_id:ObjectId(target_id)}).findOne()
    target.followerCount += 1
    await userTable.save(target)
  }

  /**
   * @description 取消关注
   * @param {string} u_id 
   * @param {string} target_id 
   * @return
   */
  async unFollow(u_id, target_id) {
    const user = await userTable.where({_id:ObjectId(u_id)}).findOne()
    user.followingCount = Math.max(0, user.followingCount-1)
    await userTable.save(user)
    const target = await userTable.where({_id:ObjectId(target_id)}).findOne()
    target.followerCount = Math.max(0, user.followerCount-1)
    await userTable.save(target)
  }
}

module.exports = new UserService()