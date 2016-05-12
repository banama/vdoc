var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var Wb = require('webpack-boost');
var wb = new Wb()

// production
exports.pro = function (cbk) {
    process.env.NODE_ENV = "production";
    wb.setPath('vdoc').setProject('vdoc').setPublic('').loaders({
        test: /\.doc$/,
        loader: 'doc'
    }).loaders({
        test: /\.vdoc$/,
        loader: 'vdoc'
    }).pro().hook(function () {
        this.config.postcss.push(require('cssnano'));
        !!cbk && cbk.call(this);
    }.bind(wb)).run();
};

exports.dev = function (cbk) {
    process.env.NODE_ENV = "dev";
    wb.setPath('vdoc').setProject('vdoc').setPublic('').loaders({
        test: /\.doc$/,
        loader: 'doc'
    }).loaders({
        test: /\.vdoc$/,
        loader: 'vdoc'
    }).hook(function () {
        !!cbk && cbk.call(this);
    }.bind(wb)).run();
};

exports.live = function (serverOptions, cbk) {
    process.env.NODE_ENV = "live";
    wb.setPath('vdoc').setProject('vdoc').setPublic('').loaders({
        test: /\.doc$/,
        loader: 'doc'
    }).loaders({
        test: /\.vdoc$/,
        loader: 'vdoc'
    }).hook(function () {
        !!cbk && cbk.call(this);
    }.bind(wb)).live(serverOptions);
}
