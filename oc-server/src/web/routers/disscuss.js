const Router = require('@koa/router')

const router = new Router({
  prefix: '/web/disscuss'
})

const authMiddleware = require('../middleware/authMiddleware')
const disscussController = require('../controllers/disscussController')

// 编辑缓存 (未发布状态)
router.post('/cache', authMiddleware.verifyAuth, disscussController.editCache)
// 拿到缓存
router.get('/cache', authMiddleware.verifyAuth, disscussController.getCache)
// 清除缓存 (发布的时候应该调用)
router.delete('/cache', authMiddleware.verifyAuth, disscussController.clearCache)

// 发布帖子
router.post('/', authMiddleware.verifyAuth, disscussController.create)
// 删除帖子
router.delete('/:id', authMiddleware.verifyAuth, disscussController.delete)
// 查看帖子
router.get('/:id', disscussController.query)
// 编辑/更新帖子
router.put('/', authMiddleware.verifyAuth, disscussController.update)

module.exports = router