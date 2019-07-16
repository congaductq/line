const path = require('path')
const HWP = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            strictMath: true,
            noIeCompat: true,
          },
        },
      ],
    },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HWP(
      { template: path.join(__dirname, '/src/index.html') },
    ),
  ],
}
