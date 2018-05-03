'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //路由网关
      '/caihiot': {
        target: 'http://127.0.0.1:9130',
        changeOrigin: true,
        pathRewrite: {
          '^/caihiot': '/'
        }
      },
      '/txt': {
        target: 'http://127.0.0.1:9103',
        changeOrigin: true,
        pathRewrite: {
          '^/txt': '/'
        }
      },
      //验证码（图片）
      '/vailcode': {
        target: 'http://127.0.0.1:9092',
        changeOrigin: true,
        pathRewrite: {
          '^/vailcode': '/'
        }
      },
      '/forgetpass': {
        target: 'http://127.0.0.1:9093',
        changeOrigin: true,
        pathRewrite: {
          '^/forgetpass': '/'
        }
      },
      '/mainchart': {
        target: 'http://127.0.0.1:9099',
        changeOrigin: true,
        pathRewrite: {
          '^/mainchart': '/'
        }
      },
      '/register': {
        target: 'http://127.0.0.1:9096',
        changeOrigin: true,
        pathRewrite: {
          '^/register': '/'
        }
      },
      '/info': {
        target: 'http://127.0.0.1:9118',
        changeOrigin: true,
        pathRewrite: {
          '^/info': '/'
        }
      },
      '/numberapply': {
        target: 'http://172.16.0.28:9100',
        changeOrigin: true,
        pathRewrite: {
          '^/numberapply': '/'
        }
      },
      '/applyquery': {
        target: 'http://172.16.0.28:9101',
        changeOrigin: true,
        pathRewrite: {
          '^/applyquery': '/'
        }
      },
      '/usercard': {
        target: 'http://172.16.0.4:9112',
        changeOrigin: true,
        pathRewrite: {
          '^/usercard': '/'
        }
      },
      '/operatequery': {
        target: 'http://127.0.0.1:9104',
        changeOrigin: true,
        pathRewrite: {
          '^/operatequery': '/'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9128, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
