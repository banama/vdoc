import initMixin from './init'
import envMixin from './env'
import utilMixin from './util'

export default function Vdoc(options){
    this.configfile = './.vodc.vdoc'
    this._route = {}
    this.data = {}
    this.moutData = {}
}

initMixin(Vdoc)
envMixin(Vdoc)
utilMixin(Vdoc)
