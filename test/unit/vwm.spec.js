var Vdoc = require('../../dist/index.js').default
var Vue = require('vue')
var VueRouter = require('vue-router')
Vue.use(VueRouter)
var data = require('../test.json')
var vdoc = new Vdoc({
    Vue: Vue
})
vdoc.mout(data)

describe('test api', function () {

    var el
    beforeEach(function () {
        el = document.createElement('div')
        el.id = 'app'
        el.innerHTML = "<router-view></router-view>"
        document.body.appendChild(el)
    })

    afterEach(function () {
        document.body.removeChild(el)
    })


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
    })

    it('getdoc', function () {
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
