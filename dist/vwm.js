'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (Vdoc) {

    // Vue and webpack method

    Vdoc.prototype.start = function (el, routeOptions) {
        // start a app
        var self = this;
        self.use('router', new _vueRouter2.default(routeOptions));
        self.filter('path', "").forEach(function (data) {
            self.router.on(data.route, {
                component: Vue.options.components.vdoc,
                data: self
            });
        });
        (0, _utils.keys)(self._route).forEach(function (route) {
            self.router.on(route, {
                component: self._route[route].component,
                data: self
            });
        });
        self.router.start(Vue.extend({}), el);
    };

    Vdoc.prototype.theme = function (themes) {
        // dynamic load the theme
        (0, _utils.keys)(themes).forEach(function (theme) {
            Vue.component(theme, themes[theme]);
        });
    };

    Vdoc.prototype.addRoute = function (path, handler) {
        // addRoute add manual route to _route
        if (!!this._route[path]) {
            throw new Error("[vdoc] you have had a same route " + path);
        }
        if (!!this.router) {
            this.router.on(path, {
                component: handler,
                data: this
            });
            return true;
        }
        this._route[path] = {
            route: path,
            component: handler
        };
    };

    Vdoc.prototype.getDoc = function (route, cbk) {
        // resolve document async
        // __vdoc_loader_process__ is a global variable defined on vdoc-loader
        if ((typeof __vdoc_loader_process__ === 'undefined' ? 'undefined' : _typeof(__vdoc_loader_process__)) === void 0) {
            throw new Error("[vdoc] __vdoc_loader_process__ is undefined, you may get from vdoc-loader");
        }
        __vdoc_loader_process__[route].get(cbk);
    };

    Vdoc.prototype.register = function () {
        // the root component for vdoc
        var that = this;
        Vue.component('vdoc', {
            template: '<component :is=theme :document=html :vdoc=vdoc></component>',
            ready: function ready() {
                var self = this;
                this.vdoc.getDoc(this.route, function (docObj) {
                    docObj.html = that.processDoc(self.route, docObj.html, self.$router.mode);
                    self.html = docObj;
                });
            },
            data: function data() {
                return {
                    html: {},
                    route: this.$route.path,
                    vdoc: this.$route.data,
                    theme: !!this.$route.data.moutData[this.$route.path].template ? this.$route.data.moutData[this.$route.path].template : 'index'
                };
            },
            route: {
                canReuse: false
            }
        });
    };
};

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }