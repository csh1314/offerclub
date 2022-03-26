const Router = require('@koa/router')

const router = new Router({
  prefix: '/web/subject'
})

const authMiddleware = require('../middleware/authMiddleware')
const checkMiddleware = require('../middleware/checkMiddleware')
const subjectController = require('../controllers/subjectController')
// 意为 主题/标签
// 添加
router.post('/', authMiddleware.verifyAuth, checkMiddleware.checkSameSubject, subjectController.create)

// 列表
router.get('/list', subjectController.list)

// 模糊查询
router.get('/:keyWord', subjectController.fuzzyQuery)

module.exports = router