const inspirecloud = require('@byteinspire/inspirecloud-api')
const ObjectId = inspirecloud.db.ObjectId

const subjectTable = require('../models/subjectTable')

class SubjectService {
  /**
   * @description 添加标签
   * @param {object} subject 
   * @return 
   */
  async create(subject) {
    return await subjectTable.save(subject)
  }
 
 /**
   * @description 查询是否有相同标签
   * @param {string} content 
   * @return 
   */ 
 async queryContent(content) {
   return await subjectTable.where({content}).findOne()
 }

 /**
  * @description 查看标签列表
  * @return
  */
 async list() {
  return await subjectTable.where()
        .sort({disscussCount: -1})
        .sort({momentCount: -1})
        .limit(20)
        .find()
 }

 /**
  * @description 模糊查询
  * @param {string} keyWord 
  * @returns 
  */
 async query(keyWord) {
   const regx = new RegExp(keyWord)
   return await subjectTable.where({content: regx})
        .sort({disscussCount: -1})
        .sort({momentCount: -1})
        .limit(20)
        .find()
 }

 /**
  * @description 增加使用次数
  * @param {object} id 
  * @param {string} type disscuss/moment
  */
 async addUsedCount(id, type) {
  const subject = await subjectTable.where({_id: id}).findOne()
  if(!subject) {
    const err = new Error('wrong subject id')
    err.status = 400
    throw err
  }
  if(!type in subject) {
    const err = new Error('wrong type')
    err.status = 400
    throw err
  }
  subject[type + 'Count']++
  return await subjectTable.save(subject)
 }
}

module.exports = new SubjectService()