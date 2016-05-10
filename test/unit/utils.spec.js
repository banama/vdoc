var Util = require('../../dist/utils.js')

describe('test Util', function () {

    it('isObject', function () {
        expect(Util.isObject({})).toBeTruthy()
        expect(Util.isObject(1)).toBeFalsy()
    })

    it('mergeData', function () {
        expect(Util.mergeData({a: 1}, {a: 2})).toEqual({a: 1})
        expect(Util.mergeData({
            a: {c: 3}, b: 2
        }, {
            a: {c: 33, e: 44}, d: 22
        })).toEqual({a: {c:3, e:44}, b: 2, d:22})
    })

    it('hasOwn', function () {
        expect(Util.hasOwn({a: 1}, "a")).toBeTruthy()
        expect(Util.hasOwn({a: 1}, "toString")).toBeFalsy()
    })

    it('keys', function(){
        var obj = {a:1, b:2, c:3}
        var ary = Util.keys(obj)
        ary.forEach(function(key){
            expect(!!obj[key]).toBeTruthy()
        })
    })

    it('isArray', function(){
        expect(Util.isArray([])).toBeTruthy()
        expect(Util.isArray({a: 1})).toBeFalsy()
        expect(Util.isArray("123")).toBeFalsy()
    })
})


