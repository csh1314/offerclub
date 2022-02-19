const inspirecloud = require('@byteinspire/inspirecloud-api')

const setRedis = async (key, value, expireIn = 60 * 60 * 24 * 7 ) => {
  await inspirecloud.redis.set(key, value, 'EX', expireIn)
}

const getRedis = async (key) => await inspirecloud.redis.get(key)

const delRedis = async (...keys) => {
  await inspirecloud.redis.del(...keys)
}

const mergeGetRedis = async (...keys) => await inspirecloud.redis.mget(...keys)

module.exports = {
  setRedis,
  getRedis,
  delRedis,
  mergeGetRedis
}