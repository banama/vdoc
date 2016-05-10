export default function (Vdoc) {
    // manual route
    Vdoc._route = {}
    // the mout data
    Vdoc.moutData = {}
    // mixins
    Vdoc.mixin = {
        props: {
            document: {
                type: Object,
                default: function () {
                    return {
                        html: ''
                    }
                }
            },
            vdoc: {
                type: Object
            }
        },
        computed: {
            doc: function () {
                if (this.document.html) {
                    var self = this
                    document.title = this.vdoc.moutData[this.$route.path].title
                    this.$nextTick(function () {
                        self.vdoc.evalScript(self.document.html)
                    })
                }
                return this.document
            },
            subtitles: function () {
                return this.document.html ? this.vdoc.moutData[this.$route.path].subtitles : []
            }
        }
    }
}

