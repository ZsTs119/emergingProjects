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
  name: "EchartsTwoColumnChart",
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
      let e = [
        { num: 10 },
        { num: 20 },
        { num: 30 },
        { num: 40 },
        { num: 50 },
      ]
      this.setEchartsData(e)
    },
    //派发数据
    setEchartsData(e) {
      // console.log("发展党员各阶段收到了", e);
      let num = [0, 0, 0, 0, 0];
      e.map((item, index) => {
        num[index] = item.num;
      });
      //xAxis数据
      let xAxisData = [
        "第一阶段",
        "第二阶段",
        "第三阶段",
        "第四阶段",
        "第五阶段",
      ];
      //柱形数据
      let seriesData = num;
      let serMax = Math.max.apply(null, seriesData);
      let seriesMaxData = [];
      seriesData.forEach((element) => {
        seriesMaxData.push(serMax);
      });
      console.log("@@@", serMax, seriesMaxData, seriesData);
      this.oEchartsOptions = {
        grid: {
          height: 150,
          bottom: "20%",
          right: 0,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisTick: {
            show: false,
          },

          axisLabel: {
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
            type: "bar",
            showBackground: false,
            barMaxWidth: "20%",
            backgroundStyle: {
              color: "rgba(216, 216, 216, 0.23)",
            },
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [50, 50, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "rgba(107, 255, 255, 1)" },
                  { offset: 1, color: "rgba(58, 253, 255, 0.19)" },
                ]),
              },
            },
            label: {
              show: true,
              position: "top",
              color: "white",
            },
            data: seriesData,
          },
          {
            type: "pictorialBar",
            symbol: "bar",
            barMaxWidth: "40%",
            barGap: "-100%",
            itemStyle: {
              normal: {
                //设置图形圆角
                color: "rgba(216, 216, 216, 0.23)",
              },
            },
            data: seriesMaxData,
          },
        ],
      };
      this.oEchartsInstanceObject = echarts.init(this.$refs.Charts);
      this.oEchartsInstanceObject.setOption(this.oEchartsOptions);
    },
  }
}
</script>