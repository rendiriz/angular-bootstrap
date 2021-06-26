const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', 
                { 
                  targets: 'defaults'
                }
              ],
              '@babel/preset-typescript'
            ],
            plugins: [
              [
                '@babel/plugin-proposal-decorators',
                {
                  'legacy': true,
                }
              ],
              '@babel/plugin-proposal-class-properties',
              'lodash'
            ]
          }
        }
      }
    ],
  },
  'plugins': [
    new LodashModuleReplacementPlugin,
    new MomentLocalesPlugin({
      localesToKeep: ['id'],
    }),
  ]
};