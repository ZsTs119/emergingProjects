<style lang="scss" scoped>
@import "../index.scss";
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child" ref="Charts"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "echartsTriangle",
  data() {
    return {
      //图表实例对象
      oEchartsInstanceObject: null,
      //图表数组
      oEchartsOptions: null,
    }
  },
  beforeCreate() {

  },
  created() {

  },
  watch: {
  },
  mounted() {
    if (this.oEchartsInstanceObject) {
      this.oEchartsInstanceObject.clear();
    }
    this.getEchartsData()
  },
  methods: {
    //获得图表数据
    getEchartsData() {
      let e = {
        cs: 100,
        glyy: 200,
        gq: 300,
        gx: 400,
        jg: 500,
        lx: 600,
        nc: 700,
        qt: 800,
      }
      this.setEchartsData(e)
    },
    //派发数据
    setEchartsData(e) {
      //xAxis数据
      let aEchartsXAxisData = [
        "城市",
        "公立医院",
        "国企",
        "高校",
        "机关",
        "两新",
        "农村",
        "其他",
      ];
      //柱形数据
      let aEchartsData = [
        { name: "城市", value: e.cs },
        { name: "公立医院", value: e.glyy },
        { name: "国企", value: e.gq },
        { name: "高校", value: e.gx },
        { name: "机关", value: e.jg },
        { name: "两新", value: e.lx },
        { name: "农村", value: e.nc },
        { name: "其他", value: e.qt },
      ];
      this.oEchartsOptions = {
        grid: {
          height: 160,
          width: "80%",
          bottom: "20%",
          left: 100,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          type: "category",
          data: aEchartsXAxisData,
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: "white",
            fontSize: "14",
            margin: 24,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "RGBA(120, 231, 219, 1)",
            },
          },
        },
        yAxis: {
          type: "value",
          offset: "10",
          splitLine: {
            show: true,
            lineStyle: {
              color: "RGBA(29, 60, 75, 1)",
              width: 3,
              type: [10, 20],
            },
          },
        },
        series: [
          {
            type: "pictorialBar",
            showBackground: false,
            symbol: "triangle",
            barMaxWidth: "42%",
            backgroundStyle: {
              color: "rgba(216, 216, 216, 0.23)",
            },
            itemStyle: {
              normal: {
                //设置图形圆角
                color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "rgba(57, 221, 213, 1)" },
                  { offset: 1, color: "rgba(107, 170, 240, 0.17)" },
                ]),
              },
            },
            label: {
              show: true,
              position: "top",
              color: "white",
            },
            data: aEchartsData,
          },
        ],
      };
      this.oEchartsInstanceObject = echarts.init(this.$refs.Charts);
      this.oEchartsInstanceObject.setOption(this.oEchartsOptions);
    },
  }
}
</script>