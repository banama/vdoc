'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.mergeData = mergeData;
exports.hasOwn = hasOwn;
exports.keys = keys;
exports.isArray = isArray;
function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function mergeData(to, from) {
    var key, toVal, fromVal;
    for (key in from) {
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            to[key] = fromVal;
        } else if (isObject(toVal) && isObject(fromVal)) {
            mergeData(toVal, fromVal);
        }
    }
    return to;
}

function hasOwn(obj, key) {
    return obj.hasOwnProperty(key);
}

function keys(obj) {
    return Object.keys ? Object.keys(obj) : function () {
        var ary = [];
        for (var i in obj) {
            if (hasOwn(obj, i)) {
                ary.push(i);
            }
        }
        return ary;
    }();
}

function isArray(value) {
    return value instanceof Array || !(value instanceof Object) && Object.prototype.toString.call(value) === '[object Array]' || typeof value.length === 'number' && typeof value.splice !== 'undefined' && typeof value.propertyIsEnumerable !== 'undefined' && !value.propertyIsEnumerable('splice');
}