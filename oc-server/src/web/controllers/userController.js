
const userService = require('../services/userService')
const md5Pwd = require('../../utils/handlePwd')

class UserController {
  async create(ctx) {
    const { username, password } = ctx.request.body
    let user = await userService.getUserByUsername(username)
    if(user) {
      ctx.body = {
        code: 201,
        message: "username already exists",
        data:{}
      }
      return
    }
    user = Object.assign(ctx.request.body, {
      password: md5Pwd(password),
      desc: "",
      sex: "secret",
      avatarUrl: "",
      graduateYear: "",
      school: "",
      education: "",
      followingCount: 0,
      followerCount: 0
    })
    const userInfo = await userService.create(user)
    delete userInfo.password
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        userInfo
      }
    }
  }
  
  async patch(ctx) {
    const { newPassword } = ctx.request.body
    await userService.patch({
      ...ctx.userInfo,
      newPassword: md5Pwd(newPassword)
    })
    ctx.body = {
      code: 200,
      message: "success",
      data: {}
    }
  }
}

module.exports = new UserController()