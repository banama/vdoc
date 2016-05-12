<template>
    <div class="sidebar">
        <ul class="menu-root">
        <template v-for="doc in catalog">
            <template v-if="doc.route == $route.path">
            <li><a v-link="doc.route" class="section-link active active sidebar-link">{{doc.title}}</a>
                <ul class="menu-sub">
                    <template v-for="st in subtitles">
                    <li class="sub-deeep-{{st.deep}}" @click="jump(st.index)">
                        <a class="section-link" href="javascript:void 0">{{st.title}}</a>
                    </li>
                    </template>
                </ul>
            </li>
            </template>
            <template v-else>
                <li>
                    <a v-link="doc.route" class="sidebar-link">{{doc.title}}</a>
                </li>
            </template>
        </template>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        catalog: {
            type: Array,
            default: function(){
                return []
            }
        },
        subtitles: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    ready: function(){
        window.onscroll = function(){
            var top = document.documentElement.scrollTop || document.body.scrollTop
            var mainDom = document.querySelector('#main')
            if(mainDom == null){
                return false
            }
            if(top >= 90){
                mainDom.classList = ['fix-sidebar']
            }
            else{
                mainDom.classList = []
            }
        }
    },
    methods:{
        jump: function(index){
            var dom = document.querySelectorAll('.v--vdoc-title--')[index]
            document.documentElement.scrollTop = document.body.scrollTop = dom.offsetTop;
        }
    }
}
</script>

<style lang="stylus">
@import './css/_settings.styl'

.sidebar
    position absolute
    z-index 10
    top 0
    left 60px
    bottom 0
    padding 2.2em 0
    width 260px
    margin-right 20px
    overflow-x hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
    -ms-overflow-style none
    h2
        margintop .2em
    ul
        list-style-type none
        margin 0
        line-height 1.8em
        padding-left 1em
    .menu-root
        padding-left 0
    .menu-sub
        font-size .85em
    .sidebar-link
        color $light
        &.current
            font-weight 600
            color $green
        &.new
            &:after
                content "NEW"
                display inline-block
                font-size 10px
                font-weight 600
                color #fff
                background-color $green
                line-height 14px
                padding 0 4px
                border-radius 3px
                margin-left 5px
                vertical-align middle
                position relative
                top -1px
        &:hover
            border-bottom 2px solid $green
    .section-link
        &.active
            font-weight bold
            color $green
    .main-menu
        margin-bottom 20px
        display none
        padding-left 0

.sub-deeep-1
    font-size 1.2em
.sub-deeep-2
    font-size 1em
    padding-left .8rem

@media screen and (max-width: 720px)
    .sidebar
        position fixed
        background-color #f9f9f9
        height 100%
        top 0
        left 0
        padding 60px 30px 20px
        box-shadow 0 0 10px rgba(0,0,0,.2)
        box-sizing border-box
        transition all .4s cubic-bezier(0.4, 0, 0, 1)
        -webkit-transform translate(-320px, 0)
        transform translate(-320px, 0)
        .main-menu
            display block
        &.open
            -webkit-transform translate(0, 0)
            transform translate(0, 0)
</style>
