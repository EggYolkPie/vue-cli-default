module.exports = {
  baseUrl: './',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
  }
}
