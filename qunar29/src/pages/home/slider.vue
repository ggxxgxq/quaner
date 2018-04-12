<template>
  <swiper class="banner index-banner" :options="swiperOption">
    <swiper-slide v-for="item of sliders" :key="item.id">
      <img class="banner-img" :src="item.imgUrl" />
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'index-slider',
    props: {
      sliders: Array
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination'
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .banner
    width: 100%
    overflow: hidden
    height: 0
    padding-bottom: 31.25%
    .banner-img
      width: 100%
</style>

<style lang="stylus">
  .index-banner
    .swiper-pagination-bullet
      background: #fff
</style>
