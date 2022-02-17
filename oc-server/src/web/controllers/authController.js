const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../../app/config')
const userService = require('../services/userService')
const md5Pwd = require('../../utils/handlePwd')

class AuthController {
  async login(ctx) {
    const { username, password } = ctx.request.body
    let user = await userService.getUserByUsername(username)
    if(!user){
      ctx.body = {
        code: 201,
        message: "invalid username",
        data: {}
      }
      return
    }
    if(md5Pwd(password) !== user.password) {
      ctx.body = {
        code: 201,
        message: "incorrect password",
        data: {}
      }
      return
    }
    delete user.password
    const token = jwt.sign({
      id: user._id.toString(),
      username
    }, PRIVATE_KEY, {
      // 7天过期时间
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: "RS256"
    })
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        token
      }
    }
  }

  async success(ctx) {
    const { userInfo } = ctx
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        userInfo
      }
    }
  }
}

module.exports = new AuthController()