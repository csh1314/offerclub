const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/user"
})

const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const checkMiddleware = require('../middleware/checkMiddleware')

// 修改密码
router.patch('/', authMiddleware.verifyAuth, userController.patch)
// 修改用户信息
router.put('/', authMiddleware.verifyAuth, checkMiddleware.checkSameUsername, userController.put)

module.exports = router