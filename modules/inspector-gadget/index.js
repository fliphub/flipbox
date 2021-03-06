const util = require('util')
const inspector = require('./inspector')
const inspectorGadget = require('./inspector-gadget')

let custom = util.inspect.defaultOptions.customInspect
module.exports = {
  util,
  inspectorGadget,
  inspector,
  inspect: inspector,
  custom: (arg = false) => {
    if (arg !== true && arg !== false && arg !== null && arg !== undefined) {
      util.inspect.defaultOptions.customInspect = arg
    } else if (arg) {
      util.inspect.defaultOptions.customInspect = custom
    } else {
      util.inspect.defaultOptions.customInspect = false
    }
    return inspector
  },
}
