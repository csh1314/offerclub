const inspirecloud = require('@byteinspire/inspirecloud-api')

const handleReadFile = require('../../utils/handleReadFile')

const userService = require('../services/userService')

class FileController {
  async single(ctx) {
    const file = ctx.request.files.file
    const buffer = await handleReadFile(file.path)
    const { url } = await inspirecloud.file.upload(
      file.name,
      buffer,
      { type: file.type }
    )
    const { _id } = ctx.userInfo
    await userService.uploadAvatar({id:_id, url})
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        avatarUrl: url
      }
    }
  }

  async multi(ctx) {
    const fileList = ctx.request.files.file
    const urlList = []
    for(const file of fileList) {
      const buffer = await handleReadFile(file.path)
      const { url } = await inspirecloud.file.upload(
        file.name,
        buffer,
        { type: file.type }
      )
      urlList.push(url)
    }
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        urlList
      }
    }
  }
}

module.exports = new FileController()