# oc-server

基于Restful风格开发的一组API

### 文件目录：

```
|-- src
    |-- app    	//导出的app
    |-- utils  	//封装的工具函数
    |-- cloudFunctions  //云函数
    |-- common 	//公共的一些中间件
        |-- middleware
    |-- web   	//web端的接口
        |-- controllers
        |-- middleware
        |-- models
        |-- routers
        |-- services
    |-- admin 	//admin端的接口
        |-- ...
|-- index.js  	//入口文件
|-- inspirecloud.json // 轻服务默认的配置文件
|-- package.json
|-- .gitignore
|-- README.md
```



### 接口规范:

（1） 返回数据说明

```
{
	code: 200 | 201  //200表示成功, 201表示用户名不存在/密码错误
	message: String  //返回信息说明
	data: Object     //返回数据
}
```

（2） 异常信息说明

```
400: 客户端错误
401: 未认证用户 (用户未登录 | 登录态过期)
500: 服务端内部错误
...
```

### 接口一览:

以下省略BASE_URL

|        序号        |        接口        |        描述         | 方式（method) |                  参数                   | 返回(data)      |                        标注                        |
| :----------------: | :-----------------: | :-----------: | :-------------------------------------: | --------------- | :------------------------------------------------: | -------------------------------------------------- |
|  1  |  /web/commonLogin  |    手机号/邮箱密码登录    |     POST      |           account, password           | userInfo, token |                         -                          |
| 2 | /web/authorization |  获取当前用户信息  |      GET      |                    -                    | userInfo        |                需携带authorization                 |
|  3  |  /web/verifyLogin  | 手机验证码登录/注册 |     POST      |            phoneNumber, code            | userInfo, token | 客户端需要设置请求头 x-tt-session-v2: 用户唯一标识 |
|     4     |     /web/send      |     发送验证码      |     POST      |               phoneNumber               |                 | 客户端需要设置请求头 x-tt-session-v2: 用户唯一标识 |
|     5     |     /web/user      |      修改密码       |     PATCH     |               newPassword               |                 |                需携带authorization                 |
|     6     |     /web/user      |    修改用户信息     |      PUT      | username, desc, email, sex, school, ... | userInfo |                需携带authorization                 |
| 7 | /web/uploadAvatar  |      上传头像       |     POST      |                  file                   | avatarUrl |                需携带authorization                 |
|    8    |    /web/upload     |     上传多文件      |     POST      |                  file                   | urlList |                需携带authorization                 |
| 9 | /web/follow | 用户关注 | POST | id | isFollow | 需携带authorization |
| 10 | /web/unfollow | 用户取消关注 | POST | id | isFollow | 需携带authorization |
| 11 | /web/user/:id | 获取用户信息 | GET | - | userInfo | - |

12  	 	/web/followingList        关注的人           GET         - 	followingList             需携带authorization

13 	 	 /web/followerList         关注我的人        GET         - 	followerList               需携带authorization

### 使用Redis

使用redis来进行编辑帖子的缓存功能