<template>
  <div class="download" @click="handleClick">
    <slot></slot>
    {{link}}
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'index-download',
    data () {
      return {
        link: ""
      }
    },
    methods: {
      handleClick () {
        this.changeDownload(false)
      },
      ...mapMutations(['changeDownload'])
    },
    mounted() {
      const ua = window.navigator.userAgent.toLowerCase()
      const isIphone = ua.indexOf('iphone') > -1
      this.link = isIphone ? 'apple应用商店' : '安卓应用商店'
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .download
    z-index: 2
    position: fixed
    bottom: 0
    left: 0
    right: 0
    line-height: 1rem
    background: #000
    color: #fff
</style>
