const InspireCloud = require('@byteinspire/js-sdk')
const serviceId = 'qc88yb'

const service = new InspireCloud({ serviceId })

const callCloudFunction = (fnName, option = {}) => {
  return async () => await service.run(fnName, option)
}

const getRainbow = callCloudFunction('getRainbow')

module.exports = {
  getRainbow
}