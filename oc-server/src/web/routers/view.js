const Router = require('@koa/router')

const router = new Router({
  prefix: "/web/view"
})


const authMiddleware = require('../middleware/authMiddleware')
const viewController = require('../controllers/viewController')

// 浏览
router.post('/:id', authMiddleware.verifyAuth, viewController.create)

module.exports = router