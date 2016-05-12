<template>
    <topheader></topheader>
    <div id="main">
        <sidebar :catalog=filter :subtitles=subtitles></sidebar>
        <div class="content guide with-sidebar">
            {{{doc.html}}}
        </div>
    </div>
</template>

<script>
import vdoc from '../src/main'

export default {
    mixins: [vdoc.mixin],
    components: {
        sidebar: function(res){
            require(['./sidebar.vue'], res)
        },
        topheader: function(res){
            require(['./header.vue'], res)
        }
    },
    computed: {
        filter: function(){
            return vdoc.sort(vdoc.filter('path', ''), true)
        }
    }
}
</script>

<style lang="stylus">
@import './css/page.styl'
</style>
