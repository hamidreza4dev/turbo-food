const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  stats: 'errors-warnings',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                recursive: true,
                watch: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, './public'),
    hot: true,
    liveReload: true,
    watchFiles: './src/**/*.{scss,js}',
  },
});
