const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');
const modeConfig = env => require(`./build-tools/webpack.${env}`)(env);
const presetConfig = require('./build-tools/loadPresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: './src/App.js',
      output: {
        filename: 'bundle.js',
        path:path.resolve(__dirname,'./dist'),
        publicPath:'/'
        
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
          },
          {
            test: /\.(png|jpeg|jpg|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'images'
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  outputPath: 'images',
                  limit: 1048576
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
