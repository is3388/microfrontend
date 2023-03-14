// merge is a function to merge 2 different webpack config objects
// take all the config in webpack.common.js and merge into this dev config object
// ModuleFederationPlugin is used to integrate host app and remote app
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/'
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: '/index.html' //  or use historyApiFallback: true  which shows the URL of user's previous browser history 
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth', // name property is the global var when the app loads up
      filename: 'remoteEntry.js',
      exposes: { // AuthApp is an alias when ask for that, we will give src/bootstrap.js to
        './AuthApp': './src/bootstrap'
      },
      //shared: ['react', 'react-dom'] use this if you want to have specific version of the module to share
      shared: packageJson.dependencies // shortcut - webpack will manage for you
    })

  ]
}
// by specify devConfig in second arg which means devConfig will take priority of any similiar options assigned by commonConfig
module.exports = merge(commonConfig, devConfig) // merge two config objects and export
