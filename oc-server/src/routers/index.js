const fs = require('fs')

// 动态注册routers文件夹下的所有router
module.exports = function useRoutes() {
  fs.readFileSync(__dirname).forEach(file => {
    if(file !== 'index.js') {
      const router = require(`./${file}`)
      this.use(router.routes())
      this.use(router.allowedMethods()
    }
  })
}