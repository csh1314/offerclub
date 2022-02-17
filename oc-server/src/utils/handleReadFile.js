const fs = require('fs')

const handleReadFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

module.exports = handleReadFile