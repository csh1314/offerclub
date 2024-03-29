const koaBody = require('koa-body');
const Koa = require('koa');
const app = new Koa();

const useWebRoutes = require('../web/routers')
app.useWebRoutes = useWebRoutes

// 为应用使用中间件
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 5 * 1024 * 1024 //最大5M
  }
}));

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    ctx.status = err.status || 500;
    ctx.body = {error: err.message};
  }
});

// 注册所有路由
app.useWebRoutes()

module.exports = app;
