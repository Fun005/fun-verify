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
  // configureWebpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.vue$/,
  //     use: [
  //       {
  //         test: /\.vue$/,
  //         loader: 'vue-loader',
  //         options: {
  //           transformToRequire: {
  //             video: ['src', 'poster'],
  //             source: 'src',
  //             img: 'src',
  //             image: 'xlink:href'
  //           }
  //         }
  //       },
  //       {
  //         test: /\.js$/,
  //         loader: 'babel-loader',
  //         include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
  //       },
  //       {
  //         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //         loader: 'url-loader',
  //         options: {
  //           limit: 10000,
  //           name: assetsPath('img/[name].[hash:7].[ext]')
  //         }
  //       },
  //       {
  //         test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  //         loader: 'url-loader',
  //         options: {
  //           limit: 10000,
  //           name: assetsPath('media/[name].[hash:7].[ext]')
  //         }
  //       },
  //       {
  //         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  //         loader: 'url-loader',
  //         options: {
  //           limit: 10000,
  //           name: assetsPath('fonts/[name].[hash:7].[ext]')
  //         }
  //       }
  //     ]
  //   })
  // },

  devServer: {
    allowedHosts: [
      '.mgtv.com',
    ],
    host: 'test.mgtv.com',
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