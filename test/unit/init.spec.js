var Immutable = require('immutable');

describe('test api', function () {
    var vdoc
    var Vue
    var Vdoc = require('../../dist/index.js').default
    var Vue = require('vue')
    var data = require('../test.json')
    var vdoc = new Vdoc({
        Vue: Vue
    })
    vdoc.mout(data)

    var el = document.createElement('div')
    el.id = "app"
    el.innerHTML = ""
    document.body.appendChild(el)

    it('init', function () {
        vdoc.addRoute('/testroute', {})
        expect(!!Object.keys(vdoc._route).length).toBeTruthy()
        expect(!!Object.keys(vdoc.moutData).length).toBeTruthy()
        __vdoc_loader_process__ = {
            '/': {
                get: function(cbk){
                    var hmtl = "<h1>1</h1>"
                    cbk(html)
                }
            }
        }
        var vm = Vue.component('testmixin', {
            mixins: [vdoc.mixin],
            template: "<h1>1</h1>",
            ready: function(){
                console.log(this)
            }
        })
        var app = new Vue({
            el: el,
            components: {
                vm: Vue.options.components.testmixin
            },
            tamplate: "<vm></vm>",
            ready: function(){
                console.log(Vue.options.components.testmixin)
                console.log('-----------===========')
            }
        })
    })

})
