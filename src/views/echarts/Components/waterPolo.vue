<style lang="scss" scoped>
@import "../index.scss";

.echarts-main__flex__child {
  position: relative;
  height: auto !important;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.echarts-main__flex__child__echarts-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;

  .echarts-main__flex__child__echarts-box__echarts {
    width: 64px;
    height: 64px;
    margin-bottom: 6px;
    // background-color: saddlebrown;
  }

  .echarts-main__flex__child__echarts-box__echarts-title {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
  }

  .echarts-main__flex__child__echarts-box__echarts-num {
    position: absolute;
    top: 35%;
    left: 50%;
    width: 50px;
    transform: translate(-50%, -50%);
    font-size: 19px;
    font-family: zcoolqingkehuangyouti-Regular, zcoolqingkehuangyouti;
    text-align: center;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child">
        <div class="echarts-main__flex__child__echarts-box">
          <div class="echarts-main__flex__child__echarts-box__echarts" ref="EchartsOne"></div>
          <div class="echarts-main__flex__child__echarts-box__echarts-title">
            系统内流动
          </div>
          <div class="echarts-main__flex__child__echarts-box__echarts-num">
            {{ oEchartsNumData.nIntry }}人
          </div>
        </div>
        <div class="echarts-main__flex__child__echarts-box">
          <div class="echarts-main__flex__child__echarts-box__echarts" ref="EchartsTwo"></div>
          <div class="echarts-main__flex__child__echarts-box__echarts-title">
            系统外流出
          </div>
          <div class="echarts-main__flex__child__echarts-box__echarts-num">
            {{ oEchartsNumData.nFlow }}人
          </div>
        </div>
        <div class="echarts-main__flex__child__echarts-box">
          <div class="echarts-main__flex__child__echarts-box__echarts" ref="EchartsThree"></div>
          <div class="echarts-main__flex__child__echarts-box__echarts-title">
            系统外流入
          </div>
          <div class="echarts-main__flex__child__echarts-box__echarts-num">
            {{ oEchartsNumData.nFlowInto }}人
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EchartsWaterPolo",
  data() {
    return {
      //水球实例和options
      oEchartsIntry: null,
      oEchartsIntryOptions: null,
      oEchartsOutSideFlow: null,
      oEchartsOutSideFlowOptions: null,
      oEchartsOutSideFlowInto: null,
      oEchartsOutSideFlowIntoOptions: null,
      //水球展示数量
      oEchartsNumData: {
        nIntry: null,
        nFlow: null,
        nFlowInto: null,
      },
    }
  },
  beforeCreate() {

  },
  created() {

  },
  watch: {
  },
  mounted() {
    if (this.oEchartsIntry && this.oEchartsOutSideFlow && this.oEchartsOutSideFlowInto) {
      this.oEchartsIntry.clear();
      this.oEchartsOutSideFlow.clear();
      this.oEchartsOutSideFlowInto.clear();
    }
    this.getEchartsData()
  },
  methods: {
    //获取数据
    getEchartsData() {
      let e = {
        xtnldCount: 1,
        xtwlcCount: 2,
        xtwlrCount: 1,
      }
      this.setEchartsData(e)
    },
    //设置数据
    setEchartsData(e) {
      //系统内流动
      this.oEchartsNumData.nIntry = e.xtnldCount;
      let optionsOneData = 0.5;
      this.oEchartsIntryOptions = {
        title: {
          show: false,
        },
        series: [
          {
            type: "liquidFill", //水位图
            radius: "95%", //显示比例
            center: ["50%", "50%"], //中心点
            data: [
              {
                value: optionsOneData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      { offset: 0, color: "rgba(140, 255, 255, 1)" },
                      { offset: 1, color: "rgba(83, 255, 255, 1)" },
                    ]),
                  },
                },
              },
              {
                value: optionsOneData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      { offset: 0, color: "rgba(140, 255, 255, 0.2)" },
                      { offset: 1, color: "RGBA(44, 86, 115, 0.2)" },
                    ]),
                  },
                },
              },
            ], // data个数代表波浪数
            backgroundStyle: {
              color: "rgba(16, 33, 69, 1)",
            },
            label: {
              show: false,
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "rgba(135, 254, 255, 0.18)" },
                  { offset: 1, color: "rgba(96, 235, 255, 1)" },
                ]),
                borderWidth: 3,
              },
            },
          },
        ],
      };
      //系统外流出
      this.oEchartsNumData.nFlow = e.xtwlcCount;
      let optionsTwoData = 0.5;
      this.oEchartsOutSideFlowOptions = {
        title: {
          show: false,
        },
        series: [
          {
            type: "liquidFill", //水位图
            radius: "95%", //显示比例
            center: ["50%", "50%"], //中心点
            data: [
              {
                value: optionsTwoData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      { offset: 0, color: "rgba(176, 140, 255, 1)" },
                      { offset: 1, color: "rgba(83, 161, 255, 1)" },
                    ]),
                  },
                },
              },
              {
                value: optionsTwoData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      { offset: 0, color: "rgba(176, 140, 255, 0.2)" },
                      { offset: 1, color: "RGBA(83, 161, 255, 0.2)" },
                    ]),
                  },
                },
              },
            ], // data个数代表波浪数
            backgroundStyle: {
              color: "rgba(16, 33, 69, 1)",
            },
            label: {
              show: false,
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "rgba(135, 254, 255, 0.18)" },
                  { offset: 1, color: "rgba(96, 235, 255, 1)" },
                ]),
                borderWidth: 3,
              },
            },
          },
        ],
      };
      //系统外流入
      this.oEchartsNumData.nFlowInto = e.xtwlrCount;
      let optionsThreeData = 0.5;
      this.oEchartsOutSideFlowIntoOptions = {
        title: {
          show: false,
        },
        series: [
          {
            type: "liquidFill", //水位图
            radius: "95%", //显示比例
            center: ["50%", "50%"], //中心点
            data: [
              {
                value: optionsThreeData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      { offset: 0, color: "rgba(255, 161, 140, 1)" },
                      { offset: 1, color: "rgba(155, 255, 83, 1)" },
                    ]),
                  },
                },
              },
              {
                value: optionsThreeData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      { offset: 0, color: "rgba(255, 161, 140, 0.2)" },
                      { offset: 1, color: "RGBA(155, 255, 83, 0.2)" },
                    ]),
                  },
                },
              },
            ], // data个数代表波浪数
            backgroundStyle: {
              color: "rgba(16, 33, 69, 1)",
            },
            label: {
              show: false,
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "rgba(135, 254, 255, 0.18)" },
                  { offset: 1, color: "rgba(96, 235, 255, 1)" },
                ]),
                borderWidth: 3,
              },
            },
          },
        ],
      };
      this.oEchartsIntry = echarts.init(this.$refs.EchartsOne);
      this.oEchartsIntry.setOption(this.oEchartsIntryOptions);
      this.oEchartsOutSideFlow = echarts.init(this.$refs.EchartsTwo);
      this.oEchartsOutSideFlow.setOption(this.oEchartsOutSideFlowOptions);
      this.oEchartsOutSideFlowInto = echarts.init(this.$refs.EchartsThree);
      this.oEchartsOutSideFlowInto.setOption(this.oEchartsOutSideFlowIntoOptions);
    },
  }
}
</script>