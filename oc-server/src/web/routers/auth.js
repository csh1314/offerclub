const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

// 用户密码登录
router.post('/commonLogin', authController.commonLogin)
// 验证码登录
router.post('/verifyLogin', authController.verifyLogin)
// 认证
router.get('/authorization', authMiddleware.verifyAuth, authController.success)

router.post('/send', authController.send)


module.exports = router