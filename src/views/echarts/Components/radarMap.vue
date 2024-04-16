<style lang="scss" scoped>
@import "../index.scss";

.echarts-main__flex__child {
  display: flex;
  align-items: center;

  .echarts-main__flex__child__radar-map {
    position: relative;
    display: flex;
    flex-direction: row;
    padding-left: 65px;
    box-sizing: border-box;

    .echarts-main__flex__child__radar-map__left-tips {
      height: 182px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 206px;

      .echarts-main__flex__child__radar-map__left-tips__top {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 39px;

        .echarts-main__flex__child__radar-map__left-tips__top__icon {
          width: 34px;
          height: 34px;
          background: url("~@/assets/images/qjzspagerightBodyLeftBIcon.png") no-repeat no-repeat;
          background-size: 100% 100%;
          margin-right: 6px;
        }

        .echarts-main__flex__child__radar-map__left-tips__top__text {
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 25px;
        }
      }

      .echarts-main__flex__child__radar-map__left-tips__bottom {
        display: flex;
        flex-direction: row;
        align-items: center;

        .echarts-main__flex__child__radar-map__left-tips__top__icon {
          width: 34px;
          height: 34px;
          background: url("~@/assets/images/qjzspagerightBodyLeftQIcon.png") no-repeat no-repeat;
          background-size: 100% 100%;
          margin-right: 6px;
        }

        .echarts-main__flex__child__radar-map__left-tips__top__text {
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 25px;
        }
      }
    }

    .echarts-main__flex__child__radar-map__right-echarts {
      position: relative;
      width: 148px;
      height: 182px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .echarts-main__flex__child__radar-map__right-echarts__box {
        width: 148px;
        height: 148px;
        // background-color: saddlebrown;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-left {
        position: absolute;
        left: -119px;
        top: 32px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-left::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 120px;
        height: 12px;
        left: 0;
        bottom: -12px;
        background: url("~@/assets/images/qjzspagerightBodyRightLeft.png") no-repeat no-repeat;
        background-size: 100% 100%;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-bottom {
        position: absolute;
        left: -90px;
        bottom: 27px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-bottom::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 120px;
        height: 12px;
        left: 0;
        bottom: -12px;
        background: url("~@/assets/images/qjzspagerightBodyRightLeftBottom.png") no-repeat no-repeat;
        background-size: 100% 100%;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-top {
        min-width: 82px;
        position: absolute;
        left: 50%;
        top: -18px;
        transform: translate(-50%, 0);
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-right {
        position: absolute;
        right: -119px;
        top: 32px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-right::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 120px;
        height: 12px;
        right: 0;
        bottom: -12px;
        background: url("~@/assets/images/qjzspagerightBodyRightRight.png") no-repeat no-repeat;
        background-size: 100% 100%;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-right-bottom {
        position: absolute;
        right: -90px;
        bottom: 27px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
      }

      .echarts-main__flex__child__radar-map__right-echarts__right-right-bottom::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 120px;
        height: 12px;
        right: 0;
        bottom: -12px;
        background: url("~@/assets/images/qjzspagerightBodyRightRightBottom.png") no-repeat no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child">
        <div class="echarts-main__flex__child__radar-map">
          <div class="echarts-main__flex__child__radar-map__left-tips">
            <div class="echarts-main__flex__child__radar-map__left-tips__top">
              <div class="echarts-main__flex__child__radar-map__left-tips__top__icon"></div>
              <div class="echarts-main__flex__child__radar-map__left-tips__top__text">本地区</div>
            </div>
            <div class="echarts-main__flex__child__radar-map__left-tips__bottom">
              <div class="echarts-main__flex__child__radar-map__left-tips__top__icon"></div>
              <div class="echarts-main__flex__child__radar-map__left-tips__top__text">全市平均</div>
            </div>
          </div>
          <div class="echarts-main__flex__child__radar-map__right-echarts">
            <!--图表-->
            <div class="echarts-main__flex__child__radar-map__right-echarts__box" ref="echartsRadar"></div>
            <!--图表左边-->
            <div class="echarts-main__flex__child__radar-map__right-echarts__right-left">组织坚实度</div>
            <div class="echarts-main__flex__child__radar-map__right-echarts__right-bottom">党群连心度</div>
            <!--图表头部-->
            <div class="echarts-main__flex__child__radar-map__right-echarts__right-top">共富发展度</div>
            <!--图表右边-->
            <div class="echarts-main__flex__child__radar-map__right-echarts__right-right">治理有序度</div>
            <div class="echarts-main__flex__child__radar-map__right-echarts__right-right-bottom">生活宜居度</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "echartsRadarMap",
  data() {
    return {
      //图表实例对象
      oEchartsInstanceObject: null,
      //雷达图options
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
        bdq: [{ name: "平均值", value: 30 }, { name: "平均值", value: 40 }, { name: "平均值", value: 50 }, { name: "平均值", value: 60 }, { name: "平均值", value: 70 },],
        qs: [{ name: "平均值", value: 80 }, { name: "平均值", value: 80 }, { name: "平均值", value: 80 }, { name: "平均值", value: 80 }, { name: "平均值", value: 90 }],
        pjf: "90%"
      }
      this.setEchartsData(e);
    },
    //初始化图表
    setEchartsData(e) {
      if (e) {
        // console.log("指数接收到了", e);
        //全市平均
        let aRandarDataAll = e.qs;
        //本地区
        let aRandarDataLocal = e.bdq;
        //百分比
        let sRandarTitle = e.pjf;
        let  aSeriesDataAllValue = aRandarDataAll.map((it) => {
          return it.value;
        });
        let nRandarValuMax = Math.max(... aSeriesDataAllValue);
        nRandarValuMax = nRandarValuMax + nRandarValuMax * 0.2;
        let oRandarIndicator = aRandarDataAll.map((it) => {
          return { name: it.name, max: nRandarValuMax };
        });
        let aSeriesDataAll = [{ name: "全市平均", value:  aSeriesDataAllValue }];

        let  aSeriesDataLocalValue = aRandarDataLocal.map((it) => {
          return it.value;
        });
        let aSeriesDataLocal = [{ name: "本地区", value:  aSeriesDataLocalValue }];
        this.oEchartsOptions = {
          backgroundColor: "transparent",
          title: {
            text: sRandarTitle,
            left: "center",
            top: "center",
            zlevel: 3,
            textStyle: {
              fontSize: 18,
              color: "#FFFFFF",
              fontWeight: "bold",
              fontFamily: "PingFangSC-Medium, PingFang SC",
            },
            show: true,
          },
          grid: {
            top: "0%",
            left: "0%",
          },
          tooltip: {
            show: true,
            trigger: "item",
          },
          radar: {
            center: ["50%", "50%"],
            radius: "98%",
            shape: "circle",
            splitArea: {
              areaStyle: {
                color: ["transparent"],
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                color: "rgba(90, 142, 171,1)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 2,
                color: "rgba(90, 142, 171,1)",
              },
            },
            name: {
              show: true,
              textStyle: {
                padding: [255, 255],
              },
            },
            indicator: oRandarIndicator,
          },
          series: [
            {
              type: "radar",
              name: "全市平均",
              zlevel: 1,
              symbol: "circle",
              symbolSize: 4,
              itemStyle: {
                normal: {
                  color: "rgba(102, 170, 209,1)",
                  borderColor: "rgba(102, 170, 209,0.5)",
                  borderWidth: 0,
                },
              },
              areaStyle: {
                normal: {
                  color: "rgba(35, 102, 149,1)",
                },
              },
              lineStyle: {
                normal: {
                  color: "rgba(115, 220, 255,1)",
                  width: 4,
                },
              },
              label: {
                normal: {
                  show: false,
                  color: "white",
                  position: "top",
                },
              },
              data: aSeriesDataAll,
            },
            {
              type: "radar",
              name: "本地区",
              zlevel: 2,
              symbol: "circle",
              symbolSize: 4,
              itemStyle: {
                normal: {
                  color: "rgba(57, 255, 187,1)",
                  borderColor: "rgba(57, 255, 187,0.5)",
                  borderWidth: 0,
                },
              },
              areaStyle: {
                normal: {
                  color: "rgba(56, 190, 181,1)",
                },
              },
              lineStyle: {
                normal: {
                  color: "rgba(57, 255, 187,1)",
                  width: 4,
                },
              },
              label: {
                normal: {
                  show: false,
                  color: "white",
                  position: "top",
                },
              },

              data: aSeriesDataLocal,
            },
          ],
        };
        this.oEchartsInstanceObject = echarts.init(this.$refs.echartsRadar);
        this.oEchartsInstanceObject.setOption(this.oEchartsOptions);
      }
    },
  }
}
</script>