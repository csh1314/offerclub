const Router = require('@koa/router')

const router = new Router({
  prefix: '/web/disscuss'
})

const authMiddleware = require('../middleware/authMiddleware')
const disscussController = require('../controllers/disscussController')

// 发布帖子
router.post('/', authMiddleware.verifyAuth, disscussController.create)
// 删除帖子
router.delete('/:id', authMiddleware.verifyAuth, disscussController.delete)
// 查看帖子
router.get('/:id', disscussController.query)
// 编辑/更新帖子
router.put('/', authMiddleware.verifyAuth, disscussController.update)

module.exports = router