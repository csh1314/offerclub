
const userService = require('../services/userService')
const md5Pwd = require('../../utils/handlePwd')
class UserController {

  async query(ctx) {
    const { id } = ctx.params
    const userInfo = await userService.getUserById(id)
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
    const userInfo = await userService.patch({
      ...ctx.userInfo,
      newPassword: md5Pwd(newPassword)
    })
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        userInfo
      }
    }
  }

  async put(ctx) {
    const user = Object.assign(ctx.userInfo, ctx.request.body)
    const userInfo = await userService.put(user)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        userInfo
      }
    }
  }
}

module.exports = new UserController()