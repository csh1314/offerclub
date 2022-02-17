const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/user"
})

const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')

// 注册
router.post('/', userController.create)
// 修改密码
router.patch('/', authMiddleware.verifyAuth, userController.patch)
module.exports = router