import { hasOwn } from './utils'

export default function (Vdoc) {
    // Vdoc document process api

    Vdoc.prototype.filter = function (key, val) {
        var route = []
        for (var data in this.moutData) {
            if (hasOwn(this.moutData, data) && !!key && this.moutData[data][key].indexOf(val) > -1) {
                route.push(this.moutData[data])
            }
        }
        return route
    }

    Vdoc.prototype.getType = function (type) {
        var route = []
        if (this.cache('getType', Array.prototype.slice.call(arguments).toString(), route)) {
            return route
        }
        for (var data in this.moutData) {
            if (hasOwn(this.moutData, data) && this.moutData[data].type === type) {
                route.push(this.moutData[data])
            }
        }
        return route
    }

    Vdoc.prototype.sort = function (vdoc, orderBy) {
        if (typeof vdoc !== 'object' || !Array.isArray(vdoc)) {
            throw new Error('[vdoc] srot need a array as params')
        }

        var sorts = []
        // if(this.cache('sort', arguments, sorts)){
            // can't hit cache
            // return sorts
        // }

        if (vdoc.length <= 1) {
            return vdoc
        }
        var index = Math.floor(vdoc.length / 2)
        var anchor = vdoc.splice(index, 1)[0]
        var left = []
        var right = []
        for (var i = 0; i < vdoc.length; i++) {
            var order = anchor.order === void 0 ? Infinity : anchor.order
            if (vdoc[i].order < order) {
                if (orderBy) {
                    left.push(vdoc[i])
                } else {
                    right.push(vdoc[i])
                }
            } else {
                if (orderBy) {
                    right.push(vdoc[i])
                } else {
                    left.push(vdoc[i])
                }
            }
        }
        sorts = sorts.concat(this.sort(left, order).concat([anchor], this.sort(right, order)))
        return sorts
    }

    Vdoc.prototype.evalScript = function (docStr) {
        var _div = document.createElement('div')
        _div.innerHTML = docStr
        var rawScripts = _div.querySelectorAll('script')
        Array.prototype.slice.call(rawScripts).forEach(function (script) {
            try {
                window.eval(script.innerHTML)
            } catch (e) {
                console.warn('[vdoc markdown error] ' + e + '\n' + script.innerHTML)
            }
        })
    }

    Vdoc.prototype.processDoc = function (route, docStr, mode) {
        if (!this.moutData[route].subtitle) {
            return docStr
        }

        var dom = document.createElement('div')
        dom.innerHTML = docStr
        var htitle = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        htitle.forEach(function (hdata) {
            Array.prototype.slice.call(dom.querySelectorAll(hdata)).forEach(function (title) {
                title.classList.add('v--vdoc-title--', `v--vdoc-title-${hdata}--`)
                if (mode === 'html5') {
                    title.id = `${title.innerHTML}`
                    title.innerHTML = `<a href='#${title.innerHTML}'>${title.innerHTML}</a>`
                }
            })
        })

        this.moutData[route].subtitles = this._processSubtitle(dom, route)
        return dom.innerHTML
    }

    Vdoc.prototype._processSubtitle = function (dom, route) {
        var ary = []
        if (this.cache('processSubtitle', route, ary)) {
            return ary
        }
        var h = dom.querySelectorAll('.v--vdoc-title--')
        var deepAry = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        Array.prototype.slice.call(h).forEach(function (title, index) {
            var _titleTag = title.tagName.toLowerCase()
            var _title = title.innerHTML
            ary.push({
                deep: deepAry.indexOf(_titleTag),
                title: _title,
                index: index
            })
        })
        return ary
    }

    Vdoc.prototype.planish = function (subtitles) {
        if (typeof subtitles !== 'object' || !Array.isArray(subtitles)) {
            throw new Error('[vdoc] srot need a array as params')
        }

        var anchor = subtitles[0].deep
        subtitles.forEach(function (subtitle) {
            subtitle.deep -= anchor
        })
        return subtitles
    }
}
