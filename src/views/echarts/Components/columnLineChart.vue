<style lang="scss" scoped>
@import "../index.scss";

.echarts-main__flex {
  position: relative;
  height: 500px !important;

  .echarts-main__flex__child {
    height: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 28px;
    padding-top: 62px;
    box-sizing: border-box;
  }

  .echarts-main__flex__child__tpo-switch {
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;

    .echarts-main__flex__child__tpo-switch--default {
      cursor: pointer;
      width: 94px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      background: url("http://cdn.lxculture.vip/center_bottom_tabicon.png") no-repeat no-repeat;
      background-size: 100% 100%;
    }

    .echarts-main__flex__child__tpo-switch--active {
      cursor: pointer;
      width: 94px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #505965;
    }
  }

  .echarts-main__flex__child__number-icon {
    position: absolute;
    left: 28px;
    top: 104px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;

    .echarts-main__flex__child__number-icon__div {
      width: 5px;
      height: 12px;
      margin-right: 6px;
      background-color: #9ADDFA;
    }
  }

  .echarts-main__flex__child__drop-icon {
    position: absolute;
    right: 20%;
    top: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;

    .echarts-main__flex__child__drop-icon__div {
      width: 7px;
      height: 11px;
      margin-right: 12px;
      background: url("@/assets/images/child__proportionIconDarp.png") no-repeat no-repeat;
      background-size: 100% 100%;
    }
  }

  .echarts-main__flex__child__proportion-icon {
    position: absolute;
    right: 0px;
    top: 102px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;

    .echarts-main__flex__child__proportion-icon__div {
      width: 14px;
      height: 8px;
      margin-right: 6px;
      background: url("@/assets/images/child__proportionIcon.png") no-repeat no-repeat;
      background-size: 100% 100%;
    }
  }

  .echarts-echarts-main__flex__child__echarts-instance {
    width: 100%;
    height: 100%;
    // background-color: aqua;
  }
}
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child">
        <div class="echarts-main__flex__child__tpo-switch">
          <div
            :class="nEchartsTabIndex == index ? 'echarts-main__flex__child__tpo-switch--default' : 'echarts-main__flex__child__tpo-switch--active'"
            v-for="(item, index) in aEchartsTabData" :key="index" @click="switchTabEvent(index)">
            {{ item.sTabName }}
          </div>
        </div>
        <!-- 图表的y轴数据 -->
        <div class="echarts-main__flex__child__number-icon">
          <div class="echarts-main__flex__child__number-icon__div"></div>
          <span>件数</span>
        </div>
        <div class="echarts-main__flex__child__drop-icon">
          <div class="echarts-main__flex__child__drop-icon__div"></div>
          <span>下降{{ aEchartsTabData[nEchartsTabIndex].sDrapRate }}</span>
        </div>
        <div class="echarts-main__flex__child__proportion-icon">
          <div class="echarts-main__flex__child__proportion-icon__div"></div>
          <span>占比</span>
        </div>
        <div class="echarts-main__flex__child__proportion-icon"></div>
        <div class="echarts-echarts-main__flex__child__echarts-instance" ref="BCharts"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "echartsLineChart",
  data() {
    return {
      //图表实例对象
      oEchartsInstanceObject: null,
      //图表数组
      oEchartsOptions: null,
      aEchartsTabData: [
        {
          sTabName: "中国电信",
          aXAxisData: ["2021", "2022", "2023", "2024"],
          oYAxisMax: {
            nMax: 1600,
          },
          aColumnData: [900, 600, 1000, 500],
          aLineData: [1400, 1100, 1500, 1000],
          sDrapRate: "50%",
        },
        {
          sTabName: "国脉文化",
          aXAxisData: ["2021", "2022", "2023", "2024"],
          oYAxisMax: {
            nMax: 20,
          },
          aColumnData: [12, 9, 13, 6],
          aLineData: [18, 15, 19, 12],
          sDrapRate: "45%",
        },
      ],
      nEchartsTabIndex: 0,
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
    this.getEchartsData();
  },
  methods: {
    //图表初始化
    getEchartsData() {
      //信访数据
      //信访x轴
      let aXAxisData = this.aEchartsTabData[this.nEchartsTabIndex].aXAxisData;
      let oYAxisMax = this.aEchartsTabData[this.nEchartsTabIndex].oYAxisMax;
      let aColumnData = this.aEchartsTabData[this.nEchartsTabIndex].aColumnData;
      let aLineData = this.aEchartsTabData[this.nEchartsTabIndex].aLineData;
      this.oEchartsOptions = {
        backgroundColor: "",
        tooltip: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        grid: {
          height: 180,
          top: "5%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        legend: {
          show: false,
        },
        xAxis: [
          {
            data: aXAxisData,
            // #X轴标签颜色
            axisPointer: {
              type: "line",
              lineStyle: {
                color: "#132d39",
              },
            },
            // #X轴标签颜色
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
              margin: 8,
            },
            //#x轴刻度线
            axisTick: {
              show: false,
            },
            //#X轴线的颜色更改
            axisLine: {
              lineStyle: {
                color: "#448da3",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: oYAxisMax.nMax,
            interval: oYAxisMax.nMax / 4,
            //#y轴文字标签
            axisLabel: {
              show: true,
              formatter: "{value}",
            },
            //#y轴标线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: "#163342",
              },
            },
          },
          // {
          //   type: "value",
          //   name: "",
          //   min: 0,
          //   max: 100,
          //   interval: 25,
          //   axisLabel: {
          //     formatter: "{value} %",
          //   },
          //   //#y轴标线颜色
          //   splitLine: {
          //     show: true,
          //     lineStyle: {
          //       color: "#163342",
          //     },
          //   },
          // },
        ],
        series: [
          {
            name: "件数",
            type: "bar",
            barWidth: "22",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: aColumnData,
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [8, 8, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "#94d5f3" },
                  { offset: 1, color: "rgb(128,200,230,0.1)" },
                ]),
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 14,
                    color: "#fff",
                  },
                  position: [0, -20],
                },
              },
            },
          },
          {
            name: "完成率",
            type: "line",
            //折线中间点的类型
            symbol: "circle",
            //折线中间点的大小
            symbolSize: 15,
            //设置该类型的样式
            itemStyle: {
              normal: {
                color: "#02ad8e",
                lineStyle: {
                  color: "#02ad8e",
                },
              },
            },
            data: aLineData,
          },
        ],
      };
      this.oEchartsInstanceObject = echarts.init(this.$refs.BCharts);
      this.oEchartsInstanceObject.setOption(this.oEchartsOptions);
      window.addEventListener("resize", () => {
        this.oEchartsInstanceObject.resize();
      });
    },
    //切换Tab
    switchTabEvent(e) {
      this.nEchartsTabIndex = e;
      this.oEchartsInstanceObject.clear();
      this.getEchartsData();
    },
  }
}
</script>