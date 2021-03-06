export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

export function mergeData (to, from) {
    var key, toVal, fromVal
    for (key in from) {
        toVal = to[key]
        fromVal = from[key]
        if (!hasOwn(to, key)) {
            to[key] = fromVal
        } else if (isObject(toVal) && isObject(fromVal)) {
            mergeData(toVal, fromVal)
        }
    }
    return to
}

export function hasOwn (obj, key) {
    return obj.hasOwnProperty(key)
}

export function keys (obj) {
    var ary = []
    if (isObject(obj)) {
        for (var i in obj) {
            if (hasOwn(obj, i)) {
                ary.push(i)
            }
        }
    }
    return ary
}

export function isArray (value) {
    return value instanceof Array ||
        (!(value instanceof Object) &&
        (Object.prototype.toString.call((value)) === '[object Array]') ||
        typeof value.length === 'number' &&
        typeof value.splice !== 'undefined' &&
        typeof value.propertyIsEnumerable !== 'undefined' &&
        !value.propertyIsEnumerable('splice'))
}
