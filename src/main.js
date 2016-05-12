import Vdoc from '../index.js'
var vdoc = new Vdoc({
    Vue: Vue
})
vdoc.mout(require("../vdoc.vdoc"))
vdoc.theme(require('../theme'))
var router = vdoc.start("#app", {history: false})
router.go('/doc/intro')
module.exports = vdoc
