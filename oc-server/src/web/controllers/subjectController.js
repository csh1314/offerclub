
const subjectService = require('../services/subjectService')


class SubjectController {
  async create(ctx) {
    const subject = Object.assign({
      momentCount: 0,
      disscussCount: 0,
    }, ctx.request.body)
    const data = await subjectService.create(subject)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        subject: data
      }
    }
  }

  async list(ctx) {
    // TODO: 后续可以搞分页, 加参数 pageSize, pageIndex
    const subjects = await subjectService.list()
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        subjects
      }
    }
  }

  async fuzzyQuery(ctx) {
    const { keyWord } = ctx.params
    const subjects = await subjectService.query(keyWord)
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        subjects
      }
    }
  }
}

module.exports = new SubjectController()