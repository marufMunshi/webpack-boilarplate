var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//Check production environment
var isProd = process.env.NODE_ENV === 'production';


// Use CSS loader based on env
var cssDev = ['style-loader', 'css-loader']
var scssDev = ['style-loader', 'css-loader', 'sass-loader']

var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
})

var cssConfig = isProd ? cssProd : cssDev
var scssConfig = isProd ? cssProd : scssDev



module.exports = {
    entry: './src/js/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
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
                use: scssConfig
            },
            {
                test: /\.css$/,
                use: cssConfig
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: !isProd
        }),
    ]
};
