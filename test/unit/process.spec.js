var Vdoc = require('../../dist/index.js').default
var data = require('../test.json')
var Vue = require('vue')
var vdoc = new Vdoc({
    Vue: Vue
})
vdoc.mout(data)


describe('test api', function () {

    it('filter', function () {
        var result = vdoc.filter('path', 'api')
        expect(result.length).toBe(1)
        expect(result[0].path).toBe('./doc/api/index.doc')
    })

    it('getType', function () {
        var result= vdoc.getType('api')
        expect(result.length).toBe(1)
        expect(result[0].type).toBe('api')
    })

    it('sort', function () {
        var result = vdoc.filter('path', '')
        var result1 = vdoc.sort(result)
        expect(result1.length).toBe(2)
        expect(result1[0].order).toBe(2)
        var result2 = vdoc.sort(result, true)
        // expect(result2.length).toBe(2)
        expect(result2[0].order).toBe(1)
    })

    it('evalScript', function () {
        var docStr = '<script>window.__eval_var = "__eval_var"</script>'
        vdoc.evalScript(docStr)
        expect(window.__eval_var).toBe("__eval_var")
    })

    it('processDoc', function () {
        var docStr = "<h2>1</h2><h4>2</h4`>"
        var route = '/doc/api/index'
        var html = vdoc.processDoc(route, docStr)
        var htmldom = document.createElement('div')
        htmldom.innerHTML = html
        expect(htmldom.children[0].classList.contains('v--vdoc-title-h2--')).toBeTruthy()
        expect(htmldom.children[1].classList.contains('v--vdoc-title-h4--')).toBeTruthy()
        var html2 = vdoc.processDoc(route, docStr, 'html5')
        htmldom.innerHTML = html2
        expect(htmldom.children[0].classList.contains('v--vdoc-title-h2--')).toBeTruthy()
        expect(htmldom.children[0].children[0].getAttribute('href') === '#1').toBeTruthy()
        expect(htmldom.children[1].classList.contains('v--vdoc-title-h4--')).toBeTruthy()
        expect(htmldom.children[1].children[0].getAttribute('href') === '#2').toBeTruthy()
    })

    it('processSubtitles', function () {
        var docStr = "<h2>1</h2><h4>2</h4>"
        var route = '/doc/api/index'
        var html = vdoc.processDoc(route, docStr)
        var htmldom = document.createElement('div')
        htmldom.innerHTML = html
        var subtitles = vdoc._processSubtitle(htmldom, route)
        expect(subtitles).toEqual([
            {
                deep: 1,
                title: "1",
                index: 0
            },
            {
                deep: 3,
                title: "2",
                index: 1
            }
        ])
    })

    it('planish', function () {
        var docStr = "<h2>1</h2><h4>2</h4>"
        var route = '/doc/api/index'
        var html = vdoc.processDoc(route, docStr)
        var htmldom = document.createElement('div')
        htmldom.innerHTML = html
        var subtitles = vdoc._processSubtitle(htmldom, route)
        expect(vdoc.planish(subtitles)).toEqual([
            {
                deep: 0,
                title: "1",
                index: 0
            },
            {
                deep: 2,
                title: "2",
                index: 1
            }
        ])
    })

})
