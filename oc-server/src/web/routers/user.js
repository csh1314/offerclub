const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/user"
})

const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')

// 修改密码
router.patch('/', authMiddleware.verifyAuth, userController.patch)
// 修改用户信息
router.put('/', authMiddleware.verifyAuth, userController.put)

module.exports = router