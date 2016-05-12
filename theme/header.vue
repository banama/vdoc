<template>
    <div id="mobile-bar">
        <a class="menu-button" @click="menuBarControl"></a>
        <a class="logo" href="#!/"></a>
    </div>
    <div id="header">
        <a id="logo" href="#!/">
            <span>Vdoc</span>
        </a>
    </div>
</template>

<script>
export default{
    methods: {
        menuBarControl: function(){
            var clt = document.querySelector('.sidebar').classList
            if(clt.contains('open')){
                clt.remove('open')
            }
            else{
                clt.add('open')
            }
        }
    }
}
</script>

<style lang="stylus">
@import './css/_settings.styl'
$header-height = 40px
#header
    background-color #fff
    box-shadow 0 0 4px rgba(0,0,0,.25)
    padding 25px 60px
    position relative
    z-index 2
#logo
    display inline-block
    font-size 1.5em
    line-height $header-height
    color $dark
    font-family $logo-font
    font-weight 500
    img
        vertical-align middle
        margin-right 6px
        width $header-height
        height $header-height

#mobile-bar
    position fixed
    top 0
    left 0
    width 100%
    height 40px
    background-color #fff
    z-index 9
    display none
    box-shadow 0 0 4px rgba(0,0,0,.25)
    .menu-button
        position absolute
        width 24px
        height 24px
        top 8px
        left 12px
        background url('images/menu.png')
        background-size 24px
    .logo
        position absolute
        width 30px
        height 30px
        top 5px
        left 50%
        margin-left -15px
        background-size 30px
@media screen and (max-width: 720px)
    #mobile-bar
        display block
</style>
