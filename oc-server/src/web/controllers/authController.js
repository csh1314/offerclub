const inspirecloud = require('@byteinspire/inspirecloud-api')

const userService = require('../services/userService')
const md5Pwd = require('../../utils/handlePwd')
const handleGenerateToken = require('../../utils/handleGenerateToken')
class AuthController {
  async commonLogin(ctx) {
    const { account, password } = ctx.request.body
    let user = await userService.getUserByEmail(account)
    if(!user){
      user = await userService.getUserByPhone(account)
    }
    if(!account || !user) {
      ctx.body = {
        code: 201,
        message: "invalid account",
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
    delete user.phoneNumber
    const token = handleGenerateToken({id: user._id.toString()})
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        userInfo: user,
        token
      }
    }
  }

  async verifyLogin(ctx) {
    const { phoneNumber, code } = ctx.request.body
    try {
      await inspirecloud.user.loginByPhone(
        ctx,
        phoneNumber,
        code
      )
      let userInfo = await userService.getUserByPhone(phoneNumber)
      if(!userInfo) {
        const newUser = {
          phoneNumber,
          username: `新用户${Date.now()}`,
          password: md5Pwd("123456"),
          email: "",
          desc: "",
          sex: "secret",
          avatarUrl: "",
          graduateYear: "",
          school: "",
          education: "",
          followingCount: 0,
          followerCount: 0
        }
        userInfo = await userService.create(newUser)
      }
      delete userInfo.password
      const token = handleGenerateToken({
        id: userInfo._id.toString()
      })
      ctx.body = {
        code: 200,
        message: "success",
        data: {
          userInfo,
          token
        }
      }
    } catch (error) {
      ctx.body = {
        code: 201,
        message: error.message
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

  async send(ctx) {
    const { phoneNumber } = ctx.request.body
    await inspirecloud.user.sendSMS(
      ctx,
      phoneNumber
    )
    ctx.body = {
      code: 200,
      message:"success",
      data: {}
    }
  }
}

module.exports = new AuthController()