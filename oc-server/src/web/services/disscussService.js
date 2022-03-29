const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const disscussTable = require('../models/disscussTable')

class DisscussService {
  /**
   * @description 发布讨论
   * @param {object} disscuss 
   * @return 
   */
  async create(disscuss) {
    return await disscussTable.save(disscuss)
  }

  /**
   * @description 查询帖子
   * @param {string} id 
   */
  async query(id) {
    return await disscussTable.where({_id: ObjectId(id), is_deleted:false})
         .populate({
           ref: "author",
           table: "user",
           projection: {
            password: 0,
            phoneNumber: 0,
            email: 0
          }
         })
         .findOne()
  }

  /**
   * @description 逻辑删除帖子
   * @param {string} id 
   */
  async delete(id) {
    let disscuss = await disscussTable.where({_id: ObjectId(id), is_deleted: false}).findOne()
    disscuss.is_deleted = true
    return await disscussTable.save(disscuss)
  }

  /**
   * @description 更新帖子
   * @param {object} disscuss
   * @return {object} 
   */
  async update(disscuss) {
    const { id } = disscuss
    let data = await disscussTable.where({_id: ObjectId(id), is_deleted:false}).findOne()
    delete disscuss.id
    data = Object.assign(data, disscuss)
    return await disscussTable.save(data)
  }

  /**
   * @description 添加浏览量/点赞数/评论数/收藏数
   * @param {string} id 
   * @param {string} type 
   * @returns 
   */
  async addCount(id, type) {
    const disscuss = await disscussTable.where({_id: ObjectId(id), is_deleted: false}).findOne()
    if(!disscuss) {
      const err = new Error('wrong target')
      err.status = 400
      throw err
    }
    switch(type) {
      case 'view': 
        disscuss.viewCount++
        break
      case 'like':
        disscuss.likeCount++
        break
      case 'comment':
        disscuss.commentCount++
        break
      case 'star':
        disscuss.starCount++
        break
      default:
        const err = new Error('wrong type')
        err.status = 400
        throw err
    }
    return await disscussTable.save(disscuss)
  }

  /**
   * @description 评论数-1
   * @param {object} _id 
   */
  async subCommentCount(_id) {
    const disscuss = await disscussTable.where({_id, is_deleted:false}).findOne()
    if(!disscuss) {
      const err = new Error('wrong target')
      err.status = 400
      throw err
    }
    disscuss.commentCount = Math.max(0, disscuss.commentCount-1)
    return await disscussTable.save(disscuss)
  }

  /**
   * @description 点赞数-1
   * @param {object} _id 
   */
   async subLikeCount(_id) {
    const disscuss = await disscussTable.where({_id, is_deleted:false}).findOne()
    if(!disscuss) {
      const err = new Error('wrong target')
      err.status = 400
      throw err
    }
    disscuss.likeCount = Math.max(0, disscuss.likeCount-1)
    return await disscussTable.save(disscuss)
  }
}

module.exports = new DisscussService()