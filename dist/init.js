"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Vdoc) {

    // manual route
    Vdoc._route = {};
    // the mout data
    Vdoc.moutData = {};
    // mixins
    Vdoc.mixin = {
        props: {
            document: {
                type: Object,
                default: function _default() {
                    return {
                        html: ""
                    };
                }
            },
            vdoc: {
                type: Object
            }
        },
        computed: {
            doc: function doc() {
                if (!!this.document.html) {
                    var self = this;
                    document.title = this.vdoc.moutData[this.$route.path].title;
                    Vue.nextTick(function () {
                        self.vdoc.evalScript(self.document.html);
                    });
                }
                return this.document;
            },
            subtitles: function subtitles() {
                return !!this.document.html ? this.vdoc.moutData[this.$route.path].subtitles : [];
            }
        }
    };
};