<template>
  <div class="header" ref="header">
    景点详情
  </div>
</template>

<script>
  export default {
    name: 'detail-header',
    activated () {
      this.bindScroll()
    },
    deactivated () {
      this.unbindScroll()
    },
    methods: {
      bindScroll () {
        this.proxyFn = this.handleScroll.bind(this)
        window.addEventListener('scroll', this.proxyFn)
      },
      unbindScroll () {
        window.removeEventListener('scroll', this.proxyFn)
      },
      handleScroll (e) {
        let opacity = document.documentElement.scrollTop / 220
        opacity = opacity > 1 ? 1 : opacity
        this.$refs.header.style.opacity = opacity
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .header
    opacity: 0
    z-index: 1
    position: fixed
    top: 0
    width: 100%
    line-height: .8rem
    background: $bgColor
    text-align: center
    color: #fff
</style>
