const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const authMiddleware = require('../middleware/authMiddleware')
const checkMiddleware = require('../middleware/checkMiddleware')

const followController = require('../controllers/followController')

// 关注
router.post('/follow', authMiddleware.verifyAuth, checkMiddleware.checkFollowValid, followController.create)
// 取消关注
router.post('/unfollow', authMiddleware.verifyAuth, followController.delete)

module.exports = router