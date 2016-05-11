describe('test cache', function () {
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

    it('cache', function () {
        var ref1 = [1,2,3]
        vdoc.cache('caller', 'key', ref1)
        var ref2 = []
        vdoc.cache('caller', 'key', ref2)
        expect(ref1).toEqual(ref2)
    })
})


