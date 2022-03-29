const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const authMiddleware = require('../middleware/authMiddleware')

const likeController = require('../controllers/likeController')

// 点赞
router.post('/like', authMiddleware.verifyAuth, likeController.create)
// 取消点赞
router.post('/cancelLike', authMiddleware.verifyAuth, likeController.delete)

module.exports = router