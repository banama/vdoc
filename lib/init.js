import VueRouter from 'vue-router'

export default function(Vdoc){

    Vdoc.prototype.start = function(el, routeOptions){
        var self = this
        self.use('router', new VueRouter(routeOptions))
        self.filter('path', "").forEach(function(data){
            self.router.on(data.route, {
                component: Vue.options.components.vdoc
            })
        })
        Object.keys(self._route).forEach(function(route){
            self.router.on(route, {
                component: self._route[route].component
            })
        })
        self.router.start(Vue.extend({}), el)
    }

    Vdoc.prototype.theme = function(themes){
        Object.keys(themes).forEach(function(theme){
            Vue.component(theme, themes[theme])
        })
    }

    Vdoc.prototype.addRoute = function(path, handler){
        if(!!this._route[path]){
            throw new Error("[vdoc] you have had a same route " + path)
        }
        if(!!this.router){
            this.router.on(path, {
                component: handler
            })
            return true
        }

        this._route[path] = {
            route: path,
            component: handler
        }
    }
}
