// https://cli.vuejs.org/zh/config/#baseurl
const alias = require('./alias')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

  const path = require('path')


  const resolve = dir => {
    return path.join(__dirname, '..', dir)
  }

// build different bundle

// TODO: 需要增加线上环境地址
const getBaseUrl = () => {
  if (process.env.VUE_APP_MODE == 'production') {
    return ''
  } else if (process.env.VUE_APP_MODE == 'preProduction') {
    return ''
  } else {
    return '/'
  }
}


// launch analysis report
const getWebpackPlugins = () => {
  if (
    process.env.VUE_APP_MODE == 'production' ||
    process.env.VUE_APP_MODE == 'preProduction' ||
    process.env.VUE_APP_MODE == 'analysis' ||
    process.env.VUE_APP_MODE == 'test'
  ) {
    return [
      new BundleAnalyzerPlugin()
    ]
  } else {
    return []
  }
}

// distinguish env
const getTargetDir = () => {
  if (process.env.VUE_APP_MODE == 'production') {
    return 'deploy'
  } else {
    return 'dist'
  }
}

module.exports = {
  publicPath: getBaseUrl(),
  outputDir: getTargetDir(),
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,

  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          theme: {
            name: 'chunk-theme',
            test: /[\\/]node_modules\/element-ui[\\/]/,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          },
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
            chunks: 'initial' // 只打包初始时依赖的第三方
          }
        }
      }
    },
    devtool: 'source-map',
    resolve: {
      alias: alias,
      extensions: ['.vue', '.js', '.css', 'scss']
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          loaders: ['style', 'css', 'stylus']
        }
      ]
    },
    plugins: [
      ...getWebpackPlugins(),
      new webpack.DefinePlugin(
        Object.assign({},{
            'process.env.NODE_ENV': process.env.VUE_APP_MODE,
            API_BASE: ''
          }
        )
      )
    ]
  },
  css: {
    modules: false,
    extract: true
  },
  chainWebpack: config => {
    // inside support svg so clear that then support custom self
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        include: [resolve('src/icons')],
        symbolId: 'icon-[name]'
      })
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8868',
        changeOrigin: true,
        ws: false,
        port: 8002
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'zh-CN',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
