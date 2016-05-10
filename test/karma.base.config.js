var webpackConfig = require('./webpack.test.config.js')
delete webpackConfig.entry

module.exports = {
    frameworks: ['jasmine'],
    files: [
        './unit/index.js'
    ],
    preprocessors: {
        './unit/index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    },
    exclude: [],
    singleRun: true
}
