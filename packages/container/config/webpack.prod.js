const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin') 
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN // defined through CI/CD pipeline

const prodConfig = {
  mode: 'production', // in PROD mode, webpack makes sure all JS files build get minified and optimized
  output: {
    filename:'[name].[contenthash].js',
     // name of the file created and hash the file content for caching issue
    // filename template
    publicPath: '/container/latest' //prepend this path to all files that added script tags by htmlWebpackplugin
  },
  plugins: [ // remoteEntry files point to PROD domain not localhost:port #
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies
    })

  ]
}

module.exports = merge(commonConfig, prodConfig) // merge 2 config objects and prodConfig will take precedence of options

