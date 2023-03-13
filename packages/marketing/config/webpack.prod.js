const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/marketing/latest/'
    },
  plugins: [
      new ModuleFederationPlugin({
      name: 'marketing', 
      filename: 'remoteEntry.js',
      exposes: { // MarketingApp is an alias 
        './MarketingApp': './src/bootstrap'
      },
      //shared: ['react', 'react-dom'] use this if you want to have specific version of the module to share
      shared: packageJson.dependencies // shortcut - webpack will manage for you
    })

  ]
}

module.exports = merge(commonConfig, prodConfig) // merge two config objects and export
