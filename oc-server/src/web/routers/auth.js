const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

// 登录
router.post('/login', authController.login)
// 认证
router.get('/authorization', authMiddleware.verifyAuth, authController.success)

module.exports = router