const Router = require('@koa/router')

const router = new Router({
  prefix: '/web/disscuss'
})

const authMiddleware = require('../middleware/authMiddleware')
const disscussController = require('../controllers/disscussController')

// 发布帖子
router.post('/', authMiddleware.verifyAuth, disscussController.create)

module.exports = router