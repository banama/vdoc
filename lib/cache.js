import {
    mergeData
} from './utils'

export default function (Vdoc) {
    var Cache = function () {
        this._cache = Object.create(null)
    }

    Cache.prototype.get = function (caller, key, ref) {
        if (!this._cache[caller]) {
            this._cache[caller] = {}
        }
        var val = this._cache[caller][key]
        return val ? mergeData(ref, val) && val : this.put(caller, key, ref)
    }

    Cache.prototype.put = function (caller, key, ref) {
        this._cache[caller][key] = ref
        return false
    }

    var cache = new Cache()

    Vdoc.prototype.cache = function (caller, key, ref) {
        return cache.get(caller, key, ref)
    }
}
