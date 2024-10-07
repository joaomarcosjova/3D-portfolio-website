const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfiguration, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
    performance: {
        hints: 'warning', // Show a warning for asset sizes exceeding the limit
        maxEntrypointSize: 244000, // Maximum entrypoint size in bytes
        maxAssetSize: 244000, // Maximum asset size in bytes
        // Optionally, you can add a custom message:
        // assetFilter: assetFilename => {
        //     return assetFilename.endsWith('.js') || assetFilename.endsWith('.css'); // Limit to specific file types
        // }
    },
    // Optional: Uncomment the following lines to include the Webpack Bundle Analyzer
    // plugins: [
    //     ...,
    //     new BundleAnalyzerPlugin() // Uncomment this if you install the plugin
    // ],
});
