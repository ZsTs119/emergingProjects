<style lang="scss" scoped></style>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name : "cssHome",
  data(){
    return{
    }
  },
  created() {
  },
  watch:{
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData() {

    },
  }
}
</script>
