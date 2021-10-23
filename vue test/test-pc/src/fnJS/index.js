const files = require.context('.', false, /.js$/)
console.log('files', files)
const obj = {}
let apiObj = {}
files.keys().forEach(key => {
  console.log('key', key)
  if (key === './index.js') return
  apiObj = Object.assign(obj, { ...files(key).default })
})
export default apiObj
