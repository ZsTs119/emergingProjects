<style lang="scss" scoped></style>
<template>
  <aside class="aside">
    <nav>
      <div class="group" :class="activeSwitchTabClass(item)" @click="switchRouterTab(item)"
        v-for="(item, index) in aRoutersData" :key="index">
        {{ item.meta.title }}
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "appAside",
  data() {
    return {
      //当前子路由
      aRoutersData: null
    }
  },
  beforeCreate() {

  },
  computed: {
    //当前路由子路由
    routes() {
      let routes = {
        children: this.$router.options.routes
      };
      let route = this.$route.matched;
      for (let i = 0; i < route.length - 1; i++) {
        routes = routes.children.find((e) => (e.name == route[i].name));
      }
      return routes.children
    }
  },
  created() {

  },
  watch: {
    $route: {
      handler(to, from) {
        let routes = {
          children: this.$router.options.routes
        };
        let route = to.matched
        for (let i = 0; i < route.length - 1; i++) {
          routes = routes.children.find((e) => (e.name == route[i].name));
        }
        this.aRoutersData = routes.children
        this.redireRouter(this.$route)
        this.$store.commit('App/SET_ROUTER_NOW_INFO', to.matched)
        this.$bus.$emit('setNowRouterData', to.matched)
        // console.log('存储了',this.$store.state.App.setNowRouterData);
        // console.log('当前路由',this.$route)
        // console.log('当前记录', route)
        // console.log('当前路由子路由',this.aRoutersData)
      },
      deep: true,
      immediate: true,
    }
  },
  mounted() {
  },
  methods: {
    //切换路由
    switchRouterTab(e) {
      this.$router.push({ name: e.name })
    },
    //动态样式函数
    activeSwitchTabClass(e) {
      if (e.name == this.$route.name) return 'groupActive'
    },
    //重定向路由
    redireRouter(e) {
      if (e.name == 'JavaScript') this.$router.push({ name: "selectSevenDays" })
      if (e.name == 'CSS') this.$router.push({ name: "conter" })
      if (e.name == 'Echarts') this.$router.push({ name: "carousel" })
    }
  }
}
</script>
