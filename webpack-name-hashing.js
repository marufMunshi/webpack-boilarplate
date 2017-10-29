var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackChunkHash = require('webpack-chunk-hash');
var ManifestPlugin = require('webpack-manifest-plugin');

//Check production environment
var isProd = process.env.NODE_ENV === 'production';

// Change name according to environment
jsName = isProd ? 'js-[chunkhash].js' : 'bundle.js'
cssName = isProd ? 'css-[contenthash].css' : 'bundle.css'

module.exports = {
    entry: [
        './src/main/webapp/static/new/js/cssLoader.js',
        './src/main/webapp/static/new/js/common.js'
    ],
    output: {
        path: path.resolve(__dirname, 'src/main/webapp/static/new/dist'),
        filename: jsName,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|woff2)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        //Use for extracting CSS
        new ExtractTextPlugin({
            filename: cssName,
            allChunks: true
        }),
        //Use for create deterministic hash (name changed only when content change)
        new WebpackChunkHash(),
        //Use for extracting CSS & JS File name into a json file
        new ManifestPlugin()
    ]
};
