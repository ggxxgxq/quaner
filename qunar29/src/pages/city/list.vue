<template>
  <div class="container">
    <div class="fixed-title" v-show="showFixed" ref="title">
      {{letter}}
    </div>
    <div ref="wrapper" class="wrapper">
      <div class="list">
        <div class="area">
          <div class="title border-topbottom" ref="current">当前位置</div>
          <div class="content">
            <div class="button" @click="handleCityClick(city)">
              <div class="button-text button-active">
                {{city}}
              </div>
            </div>
          </div>
        </div>
        <div class="area">
          <div class="title border-topbottom" ref="hotcity">热门城市</div>
          <div class="content">
            <div class="button"
                 v-for="item in hotcity"
                 @click="handleCityClick(item.city)">
              <div class="button-text"
                   :class="{'button-active': item.city === city}">
                {{item.city}}
              </div>
            </div>
          </div>
        </div>
        <div class="area" v-for="(item, key) in list"
             :ref="key"
             :key="key">
          <div class="title border-topbottom">{{key}}</div>
          <div class="content">
            <div class="content-item border-bottom"
                 v-for="innerItem in item"
                 @click="handleCityClick(innerItem.name)">
               {{innerItem.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    name: 'city-list',
    props: {
      list: Object,
      hotcity: Array
    },
    data () {
      return {
        showFixed: true,
        letter: ''
      }
    },
    computed: {
      areaPositions () {
        const arr = []
        const { current, hotcity } = this.$refs
        arr.push({
          top: current.offsetTop,
          text: current.innerText
        })
        arr.push({
          top: hotcity.offsetTop,
          text: hotcity.innerText
        })
        for (let i in this.list) {
          arr.push({
            top: this.$refs[i][0].offsetTop,
            text: i
          })
        }
        return arr
      },
      ...mapState({
        city (state) {
          return state.city || '北京'
        }
      })
    },
    methods: {
      handleCityClick (city) {
        this.changeCity(city)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      },
      scrollToIndex (item) {
        this.scroll.scrollToElement(this.$refs[item][0])
      },
      handleScroll (e) {
        const y = -e.y
        let diff = 0
        let letter = this.letter
        for (var i = 0; i < this.areaPositions.length; i++) {
          let position = this.areaPositions[i]
          if (y > position.top - 27 && y < position.top) {
            diff = y - position.top + 27
            break
          }
          if (y > position.top) {
            letter = position.text
          }
        }
        this.showFixed = y > 0
        this.letter = letter
        this.$refs.title.style.top = (81 - diff) + 'px'
      },
      ...mapMutations(['changeCity'])
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3
      })
      this.scroll.on('scroll', this.handleScroll.bind(this))
    },
    activated () {
      this.scroll && this.scroll.refresh()
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .container
    z-index: 0
    overflow: hidden
    flex: 1
    .fixed-title
      z-index: 1
      position: fixed
      top: 1.62rem
      left: 0
      right: 0
      line-height: .54rem
      padding-left: .3rem
      background: #eee
      font-size: .26rem
      color: #616161
    .wrapper
      height: 100%
      .area
        .title
          line-height: .54rem;
          padding-left: .3rem;
          background: #eee
          color: #616161;
          font-size: .26rem;
          &::before, &::after
            border-color: #9e9e9e
        .content
          overflow: hidden
          padding: 0 .4rem .2rem .2rem
          .button
            float: left
            width: 33.33%
            .button-text
              line-height: .6rem
              margin: .2rem .1rem 0 .1rem
              border: .02rem solid #999
              border-radius: .06rem
              text-align: center
            .button-active
              color: $bgColor
              border-color: $bgColor
          .content-item
            line-height: .6rem
</style>
