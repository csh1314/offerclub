const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/comment"
})

const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

// 发布(回复)评论
router.post('/', authMiddleware.verifyAuth, commentController.create)
// 删除评论
router.delete('/:id', authMiddleware.verifyAuth, commentController.delete)
// 获取评论列表
router.get('/list/:type/:target', commentController.list)
module.exports = router