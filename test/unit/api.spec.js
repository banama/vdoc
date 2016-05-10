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

describe('test api', function () {

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
    })

    it('fresh', function () {
        var data = vdoc.moutData.route
        expect(data.config.A).toEqual(data.A)
    })
})


