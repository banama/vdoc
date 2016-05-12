var build = require('./build.js')
var VdocPlugin = require('vdoc-webpack-plugin')

build.dev(function(){
    this.setEntry({
        main: ['./src/main.js']
    })
    this.setHtml({
        template: "./template/index.html",
        filename: "index.html",
        chunk: ['main']
    })
    this.loaders({
        test: /\.styl$/,
        loader: 'stylus'
    })
    this.loaders({
        test: /\.png$/,
        loader: 'url-loader'
    })
    this.plugins(
        new VdocPlugin({
            doc: "./doc",
            outFile: "./vdoc.vdoc"
        })
    )
    this.config.watch = true
})
