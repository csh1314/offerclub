const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const disscussService = require('../services/disscussService')
const subjectService = require('../services/subjectService')

const {
  setRedis,
  getRedis,
  delRedis
} = require('../../redis')

class DisscussController {
  async create(ctx) {
    const u_id = ctx.userInfo._id
    const disscuss = Object.assign({ 
      author: u_id,
      subjects: [],
      viewCount: 0,
      likeCount: 0,
      starCount: 0,
      commentCount: 0,
      is_deleted: false
     }, ctx.request.body)
    const subjects = []
    for(const subject of ctx.request.body.subjects) {
      const subjectObj = ObjectId(subject)
      await subjectService.addUsedCount(subjectObj, 'disscuss')
      subjects.push(subjectObj)
    }
    disscuss.subjects = subjects
    const data = await disscussService.create(disscuss)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        disscuss: data
      }
    }
  }

  async delete(ctx) {
    const u_id = ctx.userInfo._id.toString()
    const { id } = ctx.params
    const disscuss = await disscussService.query(id)
    if(!disscuss || u_id !== disscuss.author._id.toString()) {
      const err = new Error('no disscuss or no auth')
      err.status = 400
      throw err
    }
    await disscussService.delete(id)
    ctx.body = {
      code: 200,
      mesage: "success",
      data: {
        isDeleted: true
      }
    }
  }

  async query(ctx) {
    const { id } = ctx.params
    const disscuss = await disscussService.query(id)
    if(!disscuss) {
      const err = new Error('no disscuss')
      err.status = 400
      throw err 
    }
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        disscuss
      }
    }
  }

  async update(ctx) {
    const u_id = ctx.userInfo._id.toString()
    const { id } = ctx.request.body
    let disscuss = await disscussService.query(id)
    if(!disscuss || u_id !== disscuss.author._id.toString()) {
      const err = new Error('no disscuss or no auth')
      err.status = 400
      throw err
    }
    await disscussService.update(ctx.request.body)
    disscuss = await disscussService.query(id)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        disscuss
      }
    }
  }

  async editCache(ctx) {
    const uid = ctx.userInfo._id.toString()
    const REDIS_KEY = `EDIT_CACHE_${uid}`
    const req = ctx.request.body
    const cache = {
      title: req.title,
      content: req.content,
      subjects: req?.subjects ?? []
    }
    await setRedis(REDIS_KEY, JSON.stringify(cache))
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        cache
      }
    }
  }

  async getCache(ctx) {
    const uid = ctx.userInfo._id.toString()
    const REDIS_KEY = `EDIT_CACHE_${uid}`
    let data = await getRedis(REDIS_KEY)
    if (data && data.length) {
      data = JSON.parse(data)
    }
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        cache: data ?? {}
      }
    }
  }

  async clearCache(ctx) {
    const uid = ctx.userInfo._id.toString()
    const REDIS_KEY = `EDIT_CACHE_${uid}`
    await delRedis(REDIS_KEY)
    ctx.body = {
      code: 200,
      message: "success",
      data: {}
    }
  }
}

module.exports = new DisscussController()