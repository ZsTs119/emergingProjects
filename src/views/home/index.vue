<style lang="scss" scoped>
/* 去除浏览器默认的color input样式 */
input[type="color"]::-webkit-color-swatch-wrapper {
  border: none;
  padding: 0;
  border-radius: 0;
  border-radius: 50%;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  padding: 0;
  border-radius: 0;
  border-radius: 50%;
}



#color-picker {
  cursor: pointer;
  display: block;
  position: fixed;
  right: 5%;
  top: 50%;
  width: 50px;
  height: 50px;
  transform: translate(0, -50%);
  border-radius: 50%;
  z-index: 2;
}

#inside-car {
  cursor: pointer;
  position: fixed;
  right: 5%;
  top: 58%;
  width: 50px;
  height: 50px;
  transform: translate(0, -50%);
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  z-index: 2;
  background-color: black;
  border: 1px solid #fff;
  box-sizing: border-box;
}

#outside-car {
  cursor: pointer;
  position: fixed;
  right: 5%;
  top: 66%;
  width: 50px;
  height: 50px;
  transform: translate(0, -50%);
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  z-index: 2;
  background-color: black;
  border: 1px solid #fff;
  box-sizing: border-box;
}

#all-aniCar {
  cursor: pointer;
  position: fixed;
  right: 5%;
  top: 74%;
  width: 50px;
  height: 50px;
  transform: translate(0, -50%);
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  z-index: 2;
  background-color: black;
  border: 1px solid #fff;
  box-sizing: border-box;
}

#three-car {
  width: 100vw;
  height: 100vh;
}
</style>
<template>
  <div>
    <div v-if="isLoading">
      <loading />
    </div>
    <div v-show="!isLoading">
      <input id="color-picker" ref="colorPicker" type="color" value="#679d5d" />
      <div id="inside-car" ref="insideCar">车内</div>
      <div id="outside-car" ref="outsideCar">车外</div>
      <div id="all-aniCar" ref="allAniCar">展开</div>
      <div id="three-car" ref="three-car"></div>
    </div>


  </div>
</template>

<script>
import loading from "@/views/components/loading/index.vue"
import carThreeMixin from './carThreeMixin'
export default {
  components: {
    loading
  },
  //混入car
  mixins: [carThreeMixin],
  name: "home",
  data() {
    return {

    }
  },
  beforeCreate() {

  },
  computed: {
    isLoading() {
      return this.CarObject.isLoading
    }
  },
  created() {

  },
  watch: {
  },
  mounted() {
    //初始化carThree
    this.initData()
    console.log('CarObject', this.CarObject.isLoading)
  },
  methods: {}
}
</script>