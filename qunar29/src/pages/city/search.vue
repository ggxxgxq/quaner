<template>
  <div class="search-wrapper">
    <div class="search">
      <input class="search-input" type="text" placeholder="输入城市名或拼音" @input="handleInputChange"/>
    </div>
    <div class="search-list" v-show="showList" ref="list">
      <ul>
        <li class="search-item border-bottom" v-show="!filterResult.length">
          无匹配城市
        </li>
        <li class="search-item border-bottom" v-for="item in filterResult">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { debounce } from 'utils/util'
  export default {
    name: 'city-search',
    props: {
      list: Object
    },
    data () {
      return {
        showList: false,
        filterResult: []
      }
    },
    computed: {
      result () {
        const result = []
        for (let i in this.list) {
          this.list[i].forEach((value) => {
            result.push({
              name: value.name,
              spell: value.spell
            })
          })
        }
        return result
      }
    },
    watch: {
      filterResult () {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    methods: {
      handleInputChange (e) {
        this.tempE = e
        debounce(this.inputChangeMethod, 50)()
      },
      inputChangeMethod () {
        const value = this.tempE.target.value.toLowerCase()
        if (value) {
          this.showList = true
          this.filterResult = this.result.filter((item) => {
            if (item.spell.indexOf(value) > -1 ||
              item.name.indexOf(value) > -1) {
              return true
            }
          })
        } else {
          this.showList = false
        }
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.list)
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .search-wrapper
    z-index: 1
  .search
    height: .74rem
    background: $bgColor
    padding: 0 .2rem
    .search-input
      line-height: .62rem
      width: 100%
      padding: 0 .2rem
      border-radius: .1rem
      text-align: center
      font-size: .24rem
      color: $fontNormalColor
      box-sizing: border-box
  .search-list
    z-index: 1
    overflow: hidden
    position: absolute
    top: 1.62rem;
    left: 0
    right: 0
    bottom: 0
    background: #f5f5f5
    .search-item
      padding-left: .2rem
      line-height: .8rem
      background: #fff
      color: #333
</style>
