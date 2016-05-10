import VueRouter from 'vue-router'
import { keys } from './utils'

export default function (Vdoc) {
    // Vue and webpack method

    Vdoc.prototype.start = function (el, routeOptions) {
        // start a app
        var self = this
        self.use('router', new VueRouter(routeOptions))
        self.filter('path', '').forEach(function (data) {
            self.router.on(data.route, {
                component: self.Vue.options.components.vdoc,
                data: self
            })
        })
        keys(self._route).forEach(function (route) {
            self.router.on(route, {
                component: self._route[route].component,
                data: self
            })
        })
        self.router.start(self.Vue.extend({}), el)
        return self.router
    }

    Vdoc.prototype.theme = function (themes) {
        // dynamic load the theme
        var self = this
        keys(themes).forEach(function (theme) {
            self.Vue.component(theme, themes[theme])
        })
    }

    Vdoc.prototype.addRoute = function (path, handler) {
        // addRoute add manual route to _route
        if (this._route[path]) {
            throw new Error('[vdoc] you have had a same route ' + path)
        }
        this._route[path] = {
            route: path,
            component: handler
        }
        if (this.router) {
            this.router.on(path, {
                component: handler,
                data: this
            })
            return true
        }
    }

    Vdoc.prototype.getDoc = function (route, cbk) {
        // resolve document async
        // __vdoc_loader_process__ is a global variable defined on vdoc-loader
        if (typeof window.__vdoc_loader_process__ === void 0) {
            throw new Error('[vdoc] __vdoc_loader_process__ is undefined, you may get from vdoc-loader')
        }
        window.__vdoc_loader_process__[route].get(cbk)
    }

    Vdoc.prototype.register = function () {
        // the root component for vdoc
        var that = this
        this.Vue.component('vdoc', {
            template: '<component :is=theme :document=html :vdoc=vdoc></component>',
            ready: function () {
                var self = this
                this.vdoc.getDoc(this.route, function (docObj) {
                    docObj.html = that.processDoc(self.route, docObj.html, self.$router.mode)
                    self.html = docObj
                })
            },
            data: function () {
                return {
                    html: {},
                    route: this.$route.path,
                    vdoc: this.$route.data,
                    theme: this.$route.data.moutData[this.$route.path].template ? this.$route.data.moutData[this.$route.path].template : 'index'
                }
            },
            route: {
                canReuse: false
            }
        })
    }
}
