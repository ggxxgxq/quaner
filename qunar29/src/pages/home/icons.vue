<template>
  <swiper class="icons" :options="swiperOption">
    <swiper-slide class="icon-page"
                  v-for="(page, index) of pages"
                  :key="index">
      <div class="icons-list">
        <div v-for="item in page" :key="item.id" class="icons-item">
          <img class="icon-img" :src="item.imgUrl" />
          <p class="icon-title">{{item.title}}</p>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'index-icons',
    props: {
      icons: Array
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination'
        }
      }
    },
    computed: {
      pages () {
        const pages = []
        this.icons.forEach((value, index) => {
          let page = Math.floor(index / 8)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(value)
        })
        return pages
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  @import '../../assets/styles/common/mixins.styl'
  .icons >>> .swiper-pagination-bullet
    background: $bgColor
  .icons
    overflow: hidden
    height: 0
    width: 100%
    padding-bottom: 3.4rem
    .icons-list
      display: flex
      flex-wrap: wrap
      .icons-item
        width: 25%
        padding-top: .3rem
        text-align: center
        .icon-img
          width: .66rem
          height: .66rem
        .icon-title
          margin-top: .16rem
          font-size: .28rem
          color: #333
          ellipsis()
</style>
