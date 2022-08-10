const path = require('path');
module.exports  = (env) => {
    const filename = env.production ? 'video-frame-cover.min.js' : 'video-frame-cover.js'
    console.log(env)
    return {
        entry: {
            index: './index.js'
        },
        mode: env.production ? 'production' : 'development',
        output: {
            filename,
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "umd",
            library: "VideoFrameCover"
        },
        plugins: [
        ],
        module:{
            rules:[
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                }
            ]
        }
    }
}