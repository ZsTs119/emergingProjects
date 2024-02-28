<style lang="scss" scoped>
@import "//at.alicdn.com/t/c/font_4441309_ikd12ld30xi.css";
.iconfont {
  font-size: inherit;
  color: inherit;
}
</style>
<template>
  <i class="iconfont" :class="fontName" />
</template>

<script>
export default {
  name: "IconFont",
  props: {
    type: {
      type: String,
      default:"info"
    }
  },
  data(){
    return {
      fontNameMap: {
        info: "icon-info",
        success: "icon-success",
        warn: "icon-warn",
        error: "icon-error",
      }
    }
  },
  beforeCreate(){

  },
  computed:{
    fontName() {
      return this.fontNameMap[this.type]
    }
  },
  created(){

  },
  watch:{
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData() {
      // console.log('fontName',this.fontName)
    },
  }
}
</script>
