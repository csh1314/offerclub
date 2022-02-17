const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const fileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/authMiddleware')

// 用户上传头像
router.post('/uploadAvatar', authMiddleware.verifyAuth, fileController.single)

module.exports = router