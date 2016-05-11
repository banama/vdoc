describe('test api', function () {
var Vdoc = require('../../dist/index.js').default
    var Vue = require('vue')
    var vdoc = new Vdoc({
        Vue: Vue
    })
    vdoc.mout({route: {
        name: 'index',
        config: {
            A: {}
        }
    }})

    it('mout', function () {
        expect(vdoc.moutData).toEqual({route: {
            name: 'index',
            config: {
                A: {}
            },
            A: {}
        }})
    })

    it('use', function () {
        vdoc.use('testuse', function () {
            return this.moutData.route.name
        })
        expect(vdoc.testuse()).toBe('index')
        try {
            vdoc.use('use', function(){})
        } catch (e) {
            expect(vdoc.use.toString()).not.toBe('function(){}')
        }
    })

    it('fresh', function () {
        var data = vdoc.moutData.route
        expect(data.config.A).toEqual(data.A)
    })
})


