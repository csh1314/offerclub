const Router = require('@koa/router')

const router = new Router({
  prefix: "/web"
})

const fileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/authMiddleware')

// 用户上传头像
router.post('/uploadAvatar', authMiddleware.verifyAuth, fileController.single)
// 上传一组图片
router.post('/upload', authMiddleware.verifyAuth, fileController.multi)

module.exports = router