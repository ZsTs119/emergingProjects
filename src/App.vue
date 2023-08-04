<style lang="scss">
@import "@/styles/index.scss";
.emApp{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $background_color;
}
</style>
<template>
  <div id="app" class="app">
    <div class="emApp">
      <header class="nav">
        <div class="nav_bar">头部</div>
      </header>
      <aside class="aside">
        <nav>标签栏</nav>
      </aside>
      <div class="screen">
        <div class="screen_doc">主体</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {

    };
  },
  watch: {

  },

  methods: {

  },
};
</script>
