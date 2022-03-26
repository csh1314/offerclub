const Router = require('@koa/router')

const router = new Router({
  prefix: '/web/moment'
})

const authMiddleware = require('../middleware/authMiddleware')
const momentController = require('../controllers/momentController')

// 发布动态
router.post('/', authMiddleware.verifyAuth, momentController.create)
// 删除动态
router.delete('/:id', authMiddleware.verifyAuth, momentController.delete)
// 查看动态
router.get('/:id', momentController.query)

module.exports = router