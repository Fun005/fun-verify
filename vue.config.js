let path = require('path')
const autoprefixer = require('autoprefixer');

function resolve (dir) {
  return path.join(__dirname, dir);
}

// function assetsPath (_path) {
//   return path.posix.join('static', _path)
// }

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: './src/assets',
  // assetsSubDirectory: 'static',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('resource', resolve('src/assets'))
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        options.limit = 0
        return options
      })
  },

  devServer: {
    // allowedHosts: [
    //   '.mgtv.com',
    // ],
    // host: 'test.mgtv.com',
    // host: 'localhost',
    port: '8080',
    proxy: {
      '/proxy': {
        target: 'http://10.200.8.206:6582',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // '^/captcha': 'http://10.200.8.206:6582/captcha'
          '^/proxy': '/'
        }
      },
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        //给postcss-loader传递选项
        plugins: [
          autoprefixer(),
        ]
      }
    }
  },
}