<template>
  <div>
    <banner
      :bannerImg="bannerImg"
      :imgList="imgList"
      >
    </banner>
    <detail-header></detail-header>
    <list :list="ticketList"></list>
    <download v-show="showDownload">download</download>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Banner from './banner'
  import Download from 'components/common/download/'
  import List from './list'
  import DetailHeader from './header'
  import axios from 'axios'
  export default {
    name: 'detail',
    props: {
      sightId: [Number, String]
    },
    data () {
      return {
        bannerImg: '',
        imgList: [],
        ticketList: [],
        download: false
      }
    },
    computed: {
      ...mapState(['showDownload'])
    },
    components: {
      Banner,
      Download,
      List,
      DetailHeader
    },
    created () {
      this.getDetailInfo()
    },
    watch: {
      sightId () {
        if (this.sightId) {
          this.getDetailInfo()
        }
      }
    },
    methods: {
      getDetailInfo () {
        axios.get('/api/detail.json', {
          params: {
            id: this.sightId
          }
        })
        .then(this.handleGetDetailSucc.bind(this))
        .catch(this.handleGetDetailErr.bind(this))
      },
      handleGetDetailSucc (res) {
        res && (res = res.data)
        if (res && res.ret && res.data) {
          this.bannerImg = res.data.bannerImg
          this.imgList = res.data.imgList
          this.ticketList = res.data.ticketList
        } else {
          this.handleGetDetailErr()
        }
      },
      handleGetDetailErr () {
        console.log('error')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
