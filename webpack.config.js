var webpack = require("webpack");
module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ["jspdf"]
    },
    output: {
        filename: './dist/index.js',
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "QreaLib"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "./dist/vendor.js")
    ],
    externals: {
        "jspdf": "jsPDF"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }],
    }
};