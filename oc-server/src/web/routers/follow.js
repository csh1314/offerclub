const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/follow"
})

const authMiddleware = require('../middleware/authMiddleware')
const checkMiddleware = require('../middleware/checkMiddleware')

const followController = require('../controllers/followController')

// 关注
router.post('/', authMiddleware.verifyAuth, checkMiddleware.checkFollowValid, followController.create)

module.exports = router