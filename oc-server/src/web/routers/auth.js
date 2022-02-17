const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const authController = require('../controllers/authController')

// 登录
router.post('/login', authController.login)

module.exports = router