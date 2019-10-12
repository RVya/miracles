/* Config File */

const MAP = {
  development: {
    API_BASE: ''
  },
  production: {
    API_BASE: ''
  },
  test: {
    API_BASE: ''
  },
  preProduction: {
    API_BASE: ''
  }
}

/* 构建测试环境的包时需要 VUE_APP_MODE 来标记*/
const NODE_ENV = process.env.VUE_APP_MODE

export default MAP[NODE_ENV]
