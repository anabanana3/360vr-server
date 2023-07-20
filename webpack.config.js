const path = require('path');
const {
    NODE_ENV = 'production',
} = process.env;

const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: NODE_ENV,
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules']
    },
    output: {
        path: path.resolve(__dirname, '.dist'),
        filename: '[name].[chunkhash].js'
    },
};
