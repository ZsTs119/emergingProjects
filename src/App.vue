<style lang="scss">
@import "@/styles/index.scss";
@import "@/styles/mixin.scss";
@include day_dark();

.emApp {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $background_color;
  transition: background-color .5s, opacity .5s, transform .3s ease;
}
</style>
<template>
  <div id="app" class="app">
    <div class="emApp">
      <template v-if="isHome">
        <router-view></router-view>
      </template>
      <template v-else>
        <nav-comp></nav-comp>
        <aside-comp></aside-comp>
        <screen-comp></screen-comp>
      </template>
    </div>
  </div>
</template>

<script>
import navComp from "@/views/AppComponents/nav.vue";
import asideComp from "@/views/AppComponents/aside.vue"
import screenComp from "@/views/AppComponents/screen.vue"
export default {
  name: 'app',
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
  computed: {
    isHome() {
      return this.$store.state.App.isHome
    }
  },
  mounted() {
    console.log('当前时间', new Date())
  },
  methods: {

  },
};
</script>
