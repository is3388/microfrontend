// define a loader to tell webpack to process some files as we start to import these files into our project
// babel is in charge of processing code from ES2015 to 20 so on and turns it into regular ES5 code for typical browser to execute
// babel/preset-react is babel process all jsx tags and add them into our app
// babel/preset-env is babel transform our code in ES2015 to ES2020 so on and convert down to ES5 syntax
// babel/plugin-transform-runtime is add additional code to enable some features for our project inside the browser such as async await syntax

const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
