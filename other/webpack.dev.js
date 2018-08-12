/** ****************************************************************************
 * A development webpack configuration.
 **************************************************************************** */
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
});
