const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  stats: {
    logging: 'none', // Set logging to 'none'
    errorDetails: true // Show error details
  },
  entry: {
    theme: './assets/js/theme.js',
    admin: './assets/js/admin.js'
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/[name].min.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true // Enable source maps for CSS
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true // Enable source maps for SASS
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/theme.min.css'
    })
  ],
  devtool: 'source-map'
};
