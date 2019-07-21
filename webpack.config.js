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
    {
      loader: 'style-loader!css-loader', test: /\.css$/,
    },
    {
      loader: 'url-loader', test: /\.(gif|jpe?g|png|ico)$/,
    },
    {
      loader: 'file-loader', test: /\.(ttf|eot|svg)$/,
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
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      favicon: path.join(__dirname, '/src/favicon.ico'),
    }),
  ],
}
