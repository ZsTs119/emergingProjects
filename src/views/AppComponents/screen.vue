<style lang="scss" scoped></style>
<template>
  <div class="screen">
    <div class="screen_doc">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name : "",
  data(){
    return{
    }
  },
  beforeCreate(){

  },
  created(){

  },
  watch:{
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData(){
    },
  }
}
</script>
