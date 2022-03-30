const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const authMiddleware = require('../middleware/authMiddleware')

const starController = require('../controllers/starController')

// 收藏
router.post('/star', authMiddleware.verifyAuth, starController.create)
// 取消收藏
router.post('/cancelStar', authMiddleware.verifyAuth, starController.delete)

module.exports = router