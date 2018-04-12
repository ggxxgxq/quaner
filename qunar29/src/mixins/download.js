export default {
  activated () {
    this.showDownload()
  },
  methods: {
    showDownload () {
      throw new Error('使用download的组件需要自己对showDownload方法进行实现')
    }
  }
}
