const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [ 
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, 
      { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'] },
      { test: /\.(png|gif|bmp|jpg|svg)$/, use: 'url-loader?limit=5000' },
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}