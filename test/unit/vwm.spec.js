describe('test api', function () {
    var vdoc
    var Vue
    var Vdoc = require('../../dist/index.js').default
    var Vue = require('vue')
    var VueRouter = require('vue-router')
    Vue.use(VueRouter)
    var data = require('../test.json')
    var vdoc = new Vdoc({
        Vue: Vue
    })
    vdoc.mout(data)

    var el = document.createElement('div')
    el.id = 'app'
    el.innerHTML = "<router-view></router-view>"
    document.body.appendChild(el)

    vdoc._route = {
        "/testroute2": {
            component: Vue.extend({})
        }
    }

    it('start', function () {
        var router = vdoc.start("#app")
        expect(router._started).toBeTruthy()
    })

    it('theme', function () {
        vdoc.theme({'testtheme': {}})
        expect(!!Vue.options.components.testtheme).toBeTruthy()
    })

    it('addroute', function () {
        vdoc.addRoute('/testroute', {})
        expect(!!vdoc._route['/testroute']).toBeTruthy()
        try {
            vdoc.addRoute('/testroute', {})
        }
        catch (e) {
            expect(1).toBe(1)
        }
    })

    it('getdoc', function () {
        try {
            vdoc.getDoc('/testroute', function(doc){
                expect(doc).toBe('doc')
            })
        }
        catch (e){}
        window.__vdoc_loader_process__ = {
            '/testroute': {
                get: function(cbk){
                    cbk('doc')
                }
            }
        }
        vdoc.getDoc('/testroute', function(doc){
            expect(doc).toBe('doc')
        })
    })

    it('register', function () {
        vdoc.register()
        expect(!!vdoc.Vue.options.components.vdoc).toBeTruthy()
    })
})
