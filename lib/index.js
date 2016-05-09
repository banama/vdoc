import apiMixin from './api'
import processMixin from './process'
import vwmMixin from './vwm'
import cache from './cache'

export default function Vdoc(options){
    // manual route
    this._route = {}
    // the mout data
    this.moutData = {}
}

apiMixin(Vdoc)
processMixin(Vdoc)
vwmMixin(Vdoc)
cache(Vdoc)
