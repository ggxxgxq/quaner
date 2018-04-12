<template>
  <div class="download" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'download',
    methods: {
      handleClick () {
        this.changeDownload(false)
      },
      ...mapMutations(['changeDownload'])
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../assets/styles/common/varibles.styl'
  .download
    z-index: 2
    position: fixed
    top: 0
    left: 0
    right: 0
    line-height: 1rem
    background: #000
    color: #fff
</style>
