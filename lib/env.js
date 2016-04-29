export default function(Vdoc){

    Vdoc.prototype.use = function(action, handler){
        if(!!this[action]){
            throw new Error("[vdoc] you have had a property " + action)
        }
        this[action] = (typeof handler == 'function' ? handler.bind(this) : handler)
    }

    Vdoc.prototype.add = function(ob){
        this.data = Object.assign(this.data, ob)
    }

    Vdoc.prototype.mout = function(data){
        this.add(__vdoc_loader_process__)
        this.moutData = data
        this.register()
        this.fresh()
    }

    Vdoc.prototype.fresh = function(){
        for(var i in this.data){
            this.moutData[i] = Object.assign({}, this.moutData[i], this.data[i], this.moutData[i].config)
        }
    }

    Vdoc.prototype.register = function(){
        var that = this;
        Vue.component('vdoc', {
            template: '<component :is=theme :document=html ></component>',
            ready: function(){
                var self = this;
                that.moutData[this.route].get(function(docObj){
                    if(that.moutData[self.route].subtitle){
                        docObj.html = that.processDoc(self.route, docObj.html, self.$router.mode)
                    }
                    self.html = docObj
                })
            },
            data: function(){
                return {
                    html: {},
                    route: this.$route.path
                }
            },
            computed: {
                theme: function(){
                    return !!this.html.template ? this.html.template : 'index'
                }
            }
        })
    }
};
