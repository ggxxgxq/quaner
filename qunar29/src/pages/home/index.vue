<template>
  <div class="main">
    <index-header></index-header>
    <slider :sliders="sliders"></slider>
    <icons :icons="icons"></icons>
    <scroller class="scroller" :sights="sights"></scroller>
    <download v-show="showDownload">下载条</download>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapMutations } from 'vuex'

  import IndexHeader from './header'
  import Slider from './slider'
  import Icons from './icons'
  import Scroller from './scroller'
  import Download from './download'

  export default {
    name: 'index',
    data () {
      return {
        sliders: [],
        icons: [],
        sights: []
      }
    },
    components: {
      IndexHeader,
      Slider,
      Icons,
      Scroller,
      Download
    },
    watch: {
      city () {
        this.getIndexData()
      }
    },
    computed: {
      ...mapState(['city', 'showDownload'])
    },
    methods: {
      ...mapMutations(['changeCity']),
      getIndexData () {
        axios.get('/api/index.json?city=' + this.city)
          .then(this.handleDataSucc.bind(this))
          .catch(this.handleDataError.bind(this))
      },
      handleDataSucc (res) {
        res = res ? res.data : null
        if (res && res.ret && res.data) {
          // res.data.city && (this.changeCity(res.data.city))
          res.data.slider && (this.sliders = res.data.slider)
          res.data.icons && (this.icons = res.data.icons)
          res.data.sights && (this.sights = res.data.sights)
        } else {
          this.handleDataError()
        }
      },
      handleDataError () {
        console.log('error')
      }
    },
    created () {
      this.getIndexData()
    }
  }
</script>

<style scoped lang="stylus">
  .main
    display: flex
    flex-direction: column
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    .scroller
      flex: 1
      overflow: hidden
</style>
