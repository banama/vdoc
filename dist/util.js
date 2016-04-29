'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (Vdoc) {

    Vdoc.prototype.filter = function (key, val) {
        var route = [];
        for (var data in this.moutData) {
            if (this.moutData.hasOwnProperty(data) && !!key && this.moutData[data][key].indexOf(val) > -1) {
                route.push(this.moutData[data]);
            }
        }
        return route;
    };

    Vdoc.prototype.getType = function (type) {
        var route = [];
        for (var data in this.moutData) {
            if (mout.hasOwnProperty(data) && this.moutData[data].type == type) {
                route.push(this.moutData[data]);
            }
        }
        return route;
    };

    Vdoc.prototype.sort = function (vdoc, order) {
        if ((typeof vdoc === 'undefined' ? 'undefined' : _typeof(vdoc)) !== 'object' || !Array.isArray(vdoc)) {
            throw new Error("[vdoc] srot need a array as params");
            return false;
        }

        if (vdoc.length <= 1) {
            return vdoc;
        }
        var index = Math.floor(vdoc.length / 2);
        var anchor = vdoc.splice(index, 1)[0];
        var left = [];
        var right = [];
        for (var i = 0; i < vdoc.length; i++) {
            var order = anchor.order == void 0 ? Infinity : anchor.order;
            if (vdoc[i].order < order) {
                if (order) {
                    left.push(vdoc[i]);
                } else {
                    right.push(vdoc[i]);
                }
            } else {
                if (order) {
                    right.push(vdoc[i]);
                } else {
                    left.push(vdoc[i]);
                }
            }
        }
        return this.sort(left, order).concat([anchor], this.sort(right, order));
    };

    Vdoc.prototype.processDoc = function (route, docStr, mode) {
        var dom = document.createElement('div');
        dom.innerHTML = docStr;
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function (hdata) {
            Array.prototype.slice.call(dom.querySelectorAll(hdata)).forEach(function (title) {
                title.classList.add('--vdoc-title--', '--vdoc-title-' + hdata + '--');
                if (mode == 'html5') {
                    title.id = '' + title.innerHTML;
                    title.innerHTML = '<a href=\'#' + title.innerHTML + '\'>' + title.innerHTML + '</a>';
                }
            });
        });

        this.moutData[route].subtitles = this._processSubtitle(dom);
        return dom.innerHTML;
    };

    Vdoc.prototype._processSubtitle = function (dom) {
        var ary = [];
        var h = dom.querySelectorAll('.--vdoc-title--');
        var deep_ary = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        Array.prototype.slice.call(h).forEach(function (title) {
            var _titleTag = title.tagName.toLowerCase();
            var _title = title.innerHTML;
            ary.push({
                deep: deep_ary.indexOf(_titleTag),
                title: _title
            });
        });
        return ary;
    };

    Vdoc.prototype.planish = function (subtitles) {
        if ((typeof subtitles === 'undefined' ? 'undefined' : _typeof(subtitles)) !== 'object' || !Array.isArray(subtitles)) {
            throw new Error("[vdoc] srot need a array as params");
            return false;
        }

        var anchor = subtitles[0].deep;
        subtitles.forEach(function (subtitle) {
            subtitle.deep -= anchor;
        });
        return subtitles;
    };
};