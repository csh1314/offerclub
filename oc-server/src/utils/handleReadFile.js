const fs = require('fs')

module.exports = function handleReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}