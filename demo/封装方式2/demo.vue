<template>
  <div></div>
</template>

<script>
  import { getorglist } from '@/assets/js/api'
  export default {
    methods: {
      async getList() {
        getorglist({ id: 200 }).then(res => {
          console.log(res)
        })
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>