const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// for delete old files
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// for css extraction
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// for css optimization
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: { 
    app: path.join(__dirname, './src/main.js'),
    vendors1: ['jquery'] // package to be packed separately
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js'
  },
  plugins: [ 
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true, // no extra space
        removeComments: true, // no comment
        removeAttributeQuotes: true // no quotes on attribute
      }
    }),
    new cleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors1', // the jquery package defined above
      filename: 'js/vendors.js' // packed to
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { // compression option
        warnings: false
      }
    }),
    // new webpack.optimize.DedupePlugin({ // removed from webpack
    //   'process.env.NODE_ENV': '"production"'
    // }),
    new ExtractTextPlugin("css/styles.css"), // to extrac css
    new OptimizeCssAssetsPlugin(), // to compress css
    new webpack.DefinePlugin({ // for client side variables
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader',
          publicPath: '../' // adding ../ prefix
        })
      },
      {
        test: /\.scss$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'],
          publicPath: '../' // adding ../ prefix
        })
      },
      {
        test: /\.less$/i, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '../' // adding ../ prefix
        })
      },
      { test: /\.(png|gif|bmp|jpg|svg)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' },
      { test:  /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}