<template>
  <div class="header">
    <div class="back iconfont">&#xe624;</div>
    <div class="search">
      <div class="search-content">
        <span class="iconfont search-icon">&#xe632;</span>
        请输入城市/景点/游玩主题
      </div>
    </div>
    <router-link to="/city">
      <div class="city">
        {{city}}
      </div>
    </router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'index-header',
    computed: {
      ...mapState(['city'])
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .header
    display: flex
    height: .88rem
    background: $bgColor
    .back
      width: .8rem
      line-height: .88rem
      text-align: center
      font-weight: bold
      font-size: .44rem
      color: #fff
    .search
      flex: 1
      .search-icon
        position: relative
        top: .02rem
      .search-content
        width: 100%
        line-height: .6rem
        margin-top: .14rem
        background: #fff
        border-radius: .1rem
        text-indent: .2rem
        color: #ccc
    .city
      overflow: hidden
      position: relative
      float: right
      max-width: 1.6rem
      line-height: .88rem
      padding: 0 .46rem 0 .22rem
      font-size: .28rem
      white-space: nowrap
      text-overflow: ellipsis
      color: #fff
      &::before
        position: absolute
        right: .16rem
        top: .38rem
        content: '\0020'
        width: 0;
        height: 0;
        border-left: .12rem solid transparent;
        border-right: .12rem solid transparent;
        border-top: .12rem solid #fff;
</style>
