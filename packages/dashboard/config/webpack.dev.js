// merge is a function to merge 2 different webpack config objects
// take all the config in webpack.common.js and merge into this dev config object
// ModuleFederationPlugin is used to integrate host app and remote app
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/'
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: '/index.html' //  or use historyApiFallback: true  which shows the URL of user's previous browser history 
    },
    headers: {
      'Access-Control-Allow-Origin': '*' // allow to load up font files which causing CORS
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard', // name property is the global var when the app loads up
      filename: 'remoteEntry.js',
      exposes: { // AuthApp is an alias when ask for that, we will give src/bootstrap.js to
        './DashboardApp': './src/bootstrap'
      },
      //shared: ['react', 'react-dom'] use this if you want to have specific version of the module to share
      shared: packageJson.dependencies // shortcut - webpack will manage for you
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
      })

  ]
}
// by specify devConfig in second arg which means devConfig will take priority of any similiar options assigned by commonConfig
module.exports = merge(commonConfig, devConfig) // merge two config objects and export
