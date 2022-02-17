const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/user"
})

const userController = require('../controllers/userController')

// 注册
router.post('/', userController.create)

module.exports = router