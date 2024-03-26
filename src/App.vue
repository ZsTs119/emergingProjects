<style lang="scss">
@import "@/styles/index.scss";
@import "@/styles/mixin.scss";
@include day_dark();
.emApp{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $background_color;
  transition: background-color .5s,opacity .5s,transform .3s ease;
}
</style>
<template>
  <div id="app" class="app">
    <div class="emApp">
      <nav-comp></nav-comp>
      <aside-comp></aside-comp>
      <screen-comp></screen-comp>
    </div>
  </div>
</template>

<script>
import navComp from "@/views/AppComponents/nav.vue";
import asideComp from "@/views/AppComponents/aside.vue"
import screenComp from "@/views/AppComponents/screen.vue"
export default {
  name: 'home',
  components: {
    navComp,
    asideComp,
    screenComp
  },
  data() {
    return {
    };
  },
  watch: {

  },
  mounted() {
    console.log( '当前时间',new datatime().format('YYYY-MM-DD HH:mm:ss'))
  },
  methods: {

  },
};
</script>
