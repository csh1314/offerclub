
const userService = require('../services/userService')
const md5Pwd = require('../../utils/handlePwd')
class UserController {
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

  async put(ctx) {
    const user = Object.assign(ctx.userInfo, ctx.request.body)
    const userInfo = await userService.put(user)
    delete userInfo.password
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