/* Webpack Alias */

const path = require('path')

module.exports = {
  '@': path.resolve(__dirname, '../src'),
  components: path.resolve(__dirname, '../src/components'),
  views: path.resolve(__dirname, '../src/views'),
  router: path.resolve(__dirname, '../src/router')
}
