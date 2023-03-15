// merge is a function to merge 2 different webpack config objects
// take all the config in webpack.common.js and merge into this dev config object

const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin') 
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    port: 8080, 
    historyApiFallback: {
      index: '/index.html' // or use historyApiFallback: true  which shows the URL of user's previous browser history 
    }
  },
  plugins: [
      new ModuleFederationPlugin({
      name: 'container',
      remotes: { // key value pair to load up that file
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
      },
      //shared: ['react', 'react-dom'] use this if you need specific version of the module to share
      shared: packageJson.dependencies // shortcut - webpack will manage for you
    })
  ]
}
// by specify devConfig in second arg which means devConfig will take priority of any similiar options assigned by commonConfig
module.exports = merge(commonConfig, devConfig) // merge two config objects and export
