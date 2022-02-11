const Router = require('@koa/router')

const router = new Router()

const authController = require('../controllers/authController')

// 登录
router.post('/login', authController.login)

module.exports = router