<style lang="scss" scoped>
@import "../index.scss";

.echarts-main__flex__child {
  position: relative;
}

.charts-main__flex__child__warning {
  position: absolute;
  width: 160px;
  height: 160px;
  left: 57px;
  bottom: -46px;
  transform: rotateX(70deg) rotateZ(0deg);
}

.charts-main__flex__child__warning-img {
  position: absolute;
  width: 170px;
  height: 170px;
  left: 51px;
  bottom: -56px;
  transform: rotateX(70deg);
  background: url("~@/assets/images/xlfwPageLeftBottomEchartsItemEchartsBg.png") no-repeat no-repeat;
  background-size: 100% 100%;
}

.charts-main__flex__child__warning-text-positon {
  position: absolute;
  width: 170px;
  height: 170px;
  left: 51px;
  bottom: -56px;
  // background-color: saddlebrown;
}

.charts-main__flex__child__warning-text-positon__text-div {
  position: absolute;
  left: 50%;
  top: 0px;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, 0);
  // background-color: saddlebrown;
}

.charts-main__flex__child__crisis-text-positon {
  position: absolute;
  width: 170px;
  height: 170px;
  right: -3px;
  bottom: -56px;
  // background-color: saddlebrown;
}

.charts-main__flex__child__crisis-text-positon__text-div {
  position: absolute;
  left: 50%;
  top: 0px;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, 0);
}

.charts-main__flex__child__warning-text-positon__text-div__title {
  height: 25px;
  text-align: center;
  padding-left: 3px;
  letter-spacing: 2px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #9a9a9a;
  line-height: 25px;
  box-sizing: border-box;
}

.charts-main__flex__child__warning-text-positon__text-div__number {
  height: 67px;
  letter-spacing: 5px;
  font-size: 48px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 67px;
  text-shadow: 0px 2px 4px #4a737a;
}

.charts-main__flex__child__crisis {
  position: absolute;
  width: 160px;
  height: 160px;
  right: 0px;
  bottom: -46px;
  position: absolute;
  transform: rotateX(70deg) rotateZ(0deg);
}

.charts-main__flex__child__crisis-img {
  position: absolute;
  width: 170px;
  height: 170px;
  right: -3px;
  bottom: -56px;
  transform: rotateX(70deg);
  background: url("~@/assets/images/xlfwPageLeftBottomEchartsItemWjEcharts.png") no-repeat no-repeat;
  background-size: 100% 100%;
}
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child">
        <!--预警率-->
        <div class="charts-main__flex__child__warning" ref="echartWarning" :style="{ transform: sEchartsWarningClass }">
        </div>
        <div class="charts-main__flex__child__warning-img"></div>
        <div class="charts-main__flex__child__warning-text-positon">
          <div class="charts-main__flex__child__warning-text-positon__text-div">
            <div class="charts-main__flex__child__warning-text-positon__text-div__title">预警率</div>
            <div class="charts-main__flex__child__warning-text-positon__text-div__number">
              {{ nWarning }}<span style="font-size: 24px;">%</span>
            </div>
          </div>
        </div>


        <!--危机率-->
        <div class="charts-main__flex__child__crisis" ref="echartCrisis" :style="{ transform: sEchartsCrisisClass }">
        </div>
        <div class="charts-main__flex__child__crisis-img"></div>
        <div class="charts-main__flex__child__crisis-text-positon">
          <div class="charts-main__flex__child__crisis-text-positon__text-div">
            <div class="charts-main__flex__child__warning-text-positon__text-div__title">完结率</div>
            <div class="charts-main__flex__child__warning-text-positon__text-div__number">
              {{ nCrisis }}<span style="font-size: 24px;">%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "echartsBoard",
  data() {
    return {
      //预警
      nWarning: null,
      oEchartsWarning: null,
      oEchartsWarningOption: null,
      sEchartsWarningClass: "rotateX(70deg) rotateZ(0deg)",
      //危机
      nCrisis: null,
      oEchartsCrisis: null,
      oEchartsCrisisOption: null,
      sEchartsCrisisClass: "rotateX(70deg) rotateZ(0deg)",
    }
  },
  beforeCreate() {

  },
  created() {

  },
  watch: {
  },
  mounted() {
    if (this.nWarning && this.nCrisis) {
      this.nWarning.clear();
      this.nCrisis.clear();
    }
    this.getEchartsData()
  },
  methods: {
    //派发数据
    getEchartsData() {
      let e = {
        yjl: 60,
        wjl: 80
      }
      this.setEchartsData(e)
    },
    setEchartsData(e) {
      // console.log("每月心理预警接受到了", e);
      if (!e) {
        // console.log("返回数据有问题");
        this.nWarning = 0;
        this.nCrisis = 0;
        //预警
        this.setEchartswarning(0);
        //危机
        this.setEchartsCrisis(0);
        return;
      }
      this.nWarning = this.toFixePublic(e.yjl, 1);
      this.nCrisis = this.toFixePublic(e.wjl, 1);
      let yjnum = this.toFixePublic(e.yjl, 0) * 0.01;
      let wjnum = this.toFixePublic(e.wjl, 0) * 0.01;
      // console.log(yjnum, wjnum);
      //预警
      this.setEchartswarning(yjnum);
      //危机
      this.setEchartsCrisis(wjnum);
    },
    //预警
    setEchartswarning(e) {
      let yjmyChartData = [];
      let yjshowData = [];
      let yjhide = [];
      //预警排列圆环高亮和灰暗部分比例
      let yjshowNum = 1 - e;
      let yjhideNum = 1 - yjshowNum;
      for (let i = 0; i < Math.floor(20 * (1 - yjshowNum)); i++) {
        let i = {
          value: 10,
          name: "",
          itemStyle: {
            color: "rgba(0, 245, 253, 1)",
          },
        };
        let o = {
          value: 2,
          name: "",
          itemStyle: {
            color: "transparent",
          },
        };
        yjshowData.push(i, o);
      }
      for (let i = 0; i < Math.floor(20 * (1 - yjhideNum)); i++) {
        let i = {
          value: 10,
          name: "",
          itemStyle: {
            color: "rgba(0, 245, 253, 1)",
            opacity: 0.2,
          },
        };
        let o = {
          value: 2,
          name: "",
          itemStyle: {
            color: "transparent",
          },
        };
        yjhide.push(i, o);
      }
      //计算角度
      let yjtranRo = (1 - yjshowNum) * 100;
      if (yjtranRo == 0 || yjtranRo == 1) {
        this.sEchartsWarningClass = "rotateX(70deg) rotateZ(0deg)";
      } else {
        this.sEchartsWarningClass = `rotateX(70deg) rotateZ(${190 - 2 * yjtranRo}deg)`;
      }
      yjmyChartData = yjmyChartData.concat(...yjshowData, ...yjhide);
      this.oEchartsWarningOption = {
        backgroundColor: "",
        title: {
          show: false,
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: name,
            type: "pie",
            radius: ["62%", "95%"],
            silent: true,
            // clockwise: false,
            // startAngle: 90,
            z: 1,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: yjmyChartData,
          },
        ],
      };
      this.oEchartsWarning = echarts.init(this.$refs.echartWarning);
      this.oEchartsWarning.setOption(this.oEchartsWarningOption);
    },
    //危机
    setEchartsCrisis(e) {
      let wjmyChartData = [];
      let wjshowData = [];
      let wjhide = [];
      //预警排列圆环高亮和灰暗部分比例
      let wjshowNum = 1 - e;
      let wjhideNum = 1 - wjshowNum;
      for (let i = 0; i < Math.floor(20 * (1 - wjshowNum)); i++) {
        let i = {
          value: 10,
          name: "",
          itemStyle: {
            color: "rgba(253, 0, 214, 1)",
          },
        };
        let o = {
          value: 2,
          name: "",
          itemStyle: {
            color: "transparent",
          },
        };
        wjshowData.push(i, o);
      }
      for (let i = 0; i < Math.floor(20 * (1 - wjhideNum)); i++) {
        let i = {
          value: 10,
          name: "",
          itemStyle: {
            color: "rgba(253, 0, 214, 1)",
            opacity: 0.2,
          },
        };
        let o = {
          value: 2,
          name: "",
          itemStyle: {
            color: "transparent",
          },
        };
        wjhide.push(i, o);
      }
      //计算角度
      let wjtranRo = (1 - wjshowNum) * 100;
      if (wjtranRo == 0 || wjtranRo == 1) {
        this.sEchartsCrisisClass = "rotateX(70deg) rotateZ(0deg)";
      } else {
        this.sEchartsCrisisClass = `rotateX(70deg) rotateZ(${190 - 2 * wjtranRo}deg)`;
      }
      wjmyChartData = wjmyChartData.concat(...wjshowData, ...wjhide);
      this.oEchartsCrisisOption = {
        backgroundColor: "",
        title: {
          show: false,
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: name,
            type: "pie",
            radius: ["62%", "95%"],
            silent: true,
            // clockwise: false,
            // startAngle: 90,
            z: 1,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: wjmyChartData,
          },
        ],
      };
      this.oEchartsCrisis = echarts.init(this.$refs.echartCrisis);
      this.oEchartsCrisis.setOption(this.oEchartsCrisisOption);
    },
    //保留小数
    toFixePublic(num, decimal) {
      num = num.toString();
      let index = num.indexOf(".");
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1);
      } else {
        num = num.substring(0);
      }
      return parseFloat(num).toFixed(decimal);
    },
  }
}
</script>