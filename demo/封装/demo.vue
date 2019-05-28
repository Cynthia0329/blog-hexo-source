<template>
  <div></div>
</template>

<script>
  import api from '@/api/api.js'
  export default {
    data() {
      return {
        params: ''  
      }
    },
    methods: {
      // 1.普通的get请求
      async getList1() {
        api.queryList1()
        .then(res => {
          // 处理数据
        })
      },

      // 包含捕捉错误
      // async getList1() {
      //   api.queryList1()
      //   .then(res => {
      //     // 处理数据
      //   }).catch(error => {
      //     // 处理错误
      //   })
      // },

      // 1.普通的get请求（使用 async/await）⭐
      async getList12() {
        let res = await api.queryList1()
        // 处理数据
        // console.log(res)
      },

      // 包含捕捉错误（使用 async/await）
      // async getList12() {
      //   try {
      //     let res = await api.queryList1()
      //     // 处理数据
      //     // console.log(res)
      //   } catch (error) {
      //     // 处理错误
      //   }
      // },

      // 2.默认json传参的post请求
      async getList2() {
        let res = await api.queryList2(this.params)
        // 处理数据
      },

      // 3.multipart/form-data传参的post请求（params必须为fd格式）
      async getList3() {
        let fd = new FormData()
        fd.append('param1', this.params)
        let res = await api.queryList3(fd)
        // 处理数据
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
//@import "../../assets/styles/global";
</style>