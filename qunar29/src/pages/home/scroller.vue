<template>
  <div ref="scroller">
    <div class="content">
      <transition name="loading">
        <div v-show="isLoading" class="loading">正在加载...</div>
      </transition>
      <router-link class="item" v-for="item in list" :to="'/detail/' + item.id" :key="item.id" tag="div">
        <img class="item-img" v-lazy="item.imgUrl" />
        <div class="item-content">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <p class="item-price">
            <span class="price-tag">&yen;</span>
            {{item.price}}
            <span class="price-start">起</span>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    props: {
      sights: Array
    },
    name: 'index-scroller',
    data () {
      return {
        moreSights: [],
        isLoading: false,
        isFetching: false,
        pageNum: 1
      }
    },
    watch: {
      list () {
        this.$nextTick(() => {
          this.scroller.refresh()
        })
      }
    },
    computed: {
      list () {
        return this.sights.concat(this.moreSights)
      },
      ...mapState(['city'])
    },
    methods: {
      createScroller () {
        this.scroller = new BScroll(this.$refs.scroller, {
          probeType: 2
        })
      },
      bindEvents () {
        this.scroller.on('scroll', this.handleScroll.bind(this))
        this.scroller.on('scrollEnd', this.handleScrollEnd.bind(this))
      },
      handleScroll (e) {
        if (e.y > 60 && !this.isLoading) {
          this.getListInfo()
          this.isLoading = true
        }
      },
      handleScrollEnd () {
        this.isLoading = false
      },
      getListInfo () {
        if (!this.isFetching) {
          this.isFetching = true
          axios.get('/api/sightlist.json?city=' + this.city + '&page=' + this.pageNum)
            .then(this.handleGetListSucc.bind(this))
            .catch(this.handleGetListErr.bind(this))
        }
      },
      handleGetListSucc (res) {
        res && (res = res.data)
        if (res.data) {
          if (res.data.list) {
            this.moreSights = this.moreSights.concat(res.data.list)
            this.pageNum += 1
          }
          this.isFetching = false
        } else {
          this.handleGetListErr()
        }
      },
      handleGetListErr () {
        this.isFetching = false
        console.log('获取景点失败')
      }
    },
    mounted () {
      this.createScroller()
      this.bindEvents()
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .loading
    line-height: .8rem
    text-align: center
    color: $lightFontColor
  .loading-enter-active, .loading-leave-active
    transition: opacity .5s
  .loading-enter, .loading-leave-to
      opacity: 0
  .item
    display: flex
    padding: .24rem
    .item-img
      width: 1.4rem
      height: 1.4rem
      margin-right: .2rem
    .item-content
      flex: 1
      .item-title
        margin: .04rem 0 .1rem 0
        font-size: .3rem
        color: $fontColor
      .item-desc
        margin-bottom: .1rem
        font-size: .28rem
        color: $lightFontColor
      .item-price
        margin-top: .2rem
        font-size: .36rem
        color: $enlightFontColor
        .price-tag
          font-size: .24rem
        .price-start
          font-size: .24rem
          color: $lightFontColor
</style>
