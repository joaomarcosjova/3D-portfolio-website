const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); // For gzip compression
const TerserPlugin = require('terser-webpack-plugin'); // For JS minification

module.exports = merge(commonConfiguration, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(), // Cleans the output directory before every build
        new CompressionPlugin({ // Compresses assets using gzip
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/, // File types to compress
            threshold: 10240, // Only compress files larger than 10 KB
            minRatio: 0.8, // Minimum compression ratio to include
        }),
    ],
    performance: {
        hints: 'warning', // Show a warning for large asset sizes
        maxEntrypointSize: 244000, // Max size for entrypoints (in bytes)
        maxAssetSize: 244000, // Max size for individual assets (in bytes)
    },
    optimization: {
        minimize: true, // Minify the output
        minimizer: [
            new TerserPlugin({ // Minify JavaScript
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.log statements
                    },
                },
            }),
            '...', // Preserve default minimizers like CSS
        ],
        splitChunks: { // Code splitting for shared modules
            chunks: 'all',
        },
        runtimeChunk: 'single', // Separate runtime code for better caching
    },
});
