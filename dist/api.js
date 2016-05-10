'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Vdoc) {
    // Vdoc Object api

    Vdoc.prototype.mout = function (data) {
        // mout the vdoc config data(make by webpack)
        this.moutData = data;
        this.fresh();
        this.register();
    };

    Vdoc.prototype.use = function (action, handler) {
        if (this[action]) {
            throw new Error('[vdoc] you have had a property ' + action);
        }
        this[action] = typeof handler === 'function' ? handler.bind(this) : handler;
    };

    Vdoc.prototype.fresh = function () {
        for (var i in this.moutData) {
            if ((0, _utils.hasOwn)(this.moutData, i)) {
                (0, _utils.mergeData)(this.moutData[i], this.moutData[i].config);
            }
        }
    };
};

var _utils = require('./utils');