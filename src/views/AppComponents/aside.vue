<style lang="scss" scoped></style>
<template>
  <aside class="aside">
    <nav>
      <div
        class="group"
        :class="groupActiveFn(item)"
        @click="groupTo(item)"
        v-for="(item,index) in routesList"
        :key="index"
      >
        {{ item.meta.title }}
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name : "appAside",
  data(){
    return {
      routesList:null
    }
  },
  beforeCreate(){

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
  created(){

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
        this.routesList = routes.children
        this.pageRedirection(this.$route)
        this.$store.commit('App/SET_ROUTER_NOW_INFO', to.matched)
        this.$bus.$emit('routerNowInfo',to.matched)
        // console.log('存储了',this.$store.state.App.routerNowInfo);
        // console.log('当前路由',this.$route)
        // console.log('当前记录', route)
        // console.log('当前路由子路由',this.routesList)
      },
       deep: true,
      immediate: true,
    }
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData() {
    },
    groupTo(e) {
      this.$router.push({name:e.name})
    },
    groupActiveFn(e) {
      if(e.name == this.$route.name) return 'groupActive'
    },
    pageRedirection(e) {
      if (e.name == 'JavaScript') this.$router.push({name:"selectSevenDays"})
      if (e.name == 'CSS') this.$router.push({name:"conter"})
      if (e.name == 'Echarts') this.$router.push({name:"carousel"})
    }
  }
}
</script>
