'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Vdoc) {

    Vdoc.prototype.start = function (el, routeOptions) {
        var self = this;
        self.use('router', new _vueRouter2.default(routeOptions));
        self.filter('path', "").forEach(function (data) {
            self.router.on(data.route, {
                component: Vue.options.components.vdoc
            });
        });
        Object.keys(self._route).forEach(function (route) {
            self.router.on(route, {
                component: self._route[route].component
            });
        });
        self.router.start(Vue.extend({}), el);
    };

    Vdoc.prototype.theme = function (themes) {
        Object.keys(themes).forEach(function (theme) {
            Vue.component(theme, themes[theme]);
        });
    };

    Vdoc.prototype.addRoute = function (path, handler) {
        if (!!this._route[path]) {
            throw new Error("[vdoc] you have had a same route " + path);
        }
        if (!!this.router) {
            this.router.on(path, {
                component: handler
            });
            return true;
        }

        this._route[path] = {
            route: path,
            component: handler
        };
    };
};

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }