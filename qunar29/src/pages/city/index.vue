<template>
  <div class="main">
    <city-header></city-header>
    <search :list="list"></search>
    <list :list="list"
          :hotcity="hotcity"
          ref="list">
    </list>
    <sidebar :list="list" @changeLetter="handleLetterChange"></sidebar>
  </div>
</template>

<script>
  import CityHeader from './header'
  import Search from './search'
  import Sidebar from './sidebar'
  import List from './list'
  import axios from 'axios'
  export default {
    name: 'city',
    data () {
      return {
        list: {},
        hotcity: []
      }
    },
    components: {
      CityHeader,
      Search,
      List,
      Sidebar
    },
    methods: {
      getListInfo () {
        axios.get('/api/city.json')
          .then(this.handleGetListSucc.bind(this))
          .catch(this.handleGetListErr.bind(this))
      },
      handleGetListSucc (res) {
        res && (res = res.data)
        if (res && res.data) {
          res.data.list && (this.list = res.data.list)
          res.data.hotcity && (this.hotcity = res.data.hotcity)
        } else {
          this.handleGetListErr()
        }
      },
      handleGetListErr () {
        console.log('请求返回失败')
      },
      handleLetterChange (item) {
        this.$refs.list.scrollToIndex(item)
      }
    },
    created () {
      this.getListInfo()
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
    top: 0
    bottom: 0
</style>
