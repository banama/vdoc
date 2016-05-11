import apiMixin from './api'
import processMixin from './process'
import vwmMixin from './vwm'
import cache from './cache'
import init from './init'
import {
    mergeData
} from './utils'

export default function Vdoc (options) {
    init(this)
    !!options && mergeData(this, options)
    this.register()
}

apiMixin(Vdoc)
processMixin(Vdoc)
vwmMixin(Vdoc)
cache(Vdoc)
