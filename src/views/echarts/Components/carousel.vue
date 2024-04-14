<style lang="scss" scoped>
@import "../index.scss";
</style>
<template>
  <div class="echarts-main flex-column-center" @mouseenter="enterEchartsEvent" @mouseleave="leaveEchartsEvent">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child" ref="CarouselEcharts"></div>
      <div class="echarts-main__flex__button">
        <div class="echarts-main__flex__button__left"
          v-if="bEchartsButtonArrowsShow || nEchartsScrollRightDistance - nEchartsDataLengthPercentage != 0"
          @click="moveEchartsLeft"></div>
        <div class="echarts-main__flex__button__right"
          v-if="!bEchartsButtonArrowsShow || nEchartsScrollLeftDistance + nEchartsDataLengthPercentage < 100"
          @click="moveEchartsRight">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "echartsCarousel",
  data() {
    return {
      //图表实例对象
      oEchartsInstanceObject: null,
      //图表数组
      oEchartsOptions: null,
      //图表滚动变量
      nEchartsScrollLeftDistance: 0,
      nEchartsScrollRightDistance: 25,
      //赋值图表在Zoom上展示全部数量的百分之多少
      nEchartsDataLengthPercentage: null,
      //控制箭头的显隐
      bEchartsButtonArrowsShow: false,
      //图表数据
      //x轴数据
      aXAxisData: null,
      //派单数数据
      aEchartsSendOrderData: null,
      //接单数数据
      aEchartsTakeOrderData: null,
      //及时率数据
      aEchartsTimeLinesRate: null,
      //完成率
      aEchartsFinisingRate: null,
      //y轴数据
      oYAxisMaxInterObject: null,
      //自动滚动定时器
      oEchartsTime: null,
    }
  },
  beforeCreate() {

  },
  created() {

  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.oEchartsInstanceObject.resize();
    });
    clearInterval(this.oEchartsTime);
  },
  watch: {
  },
  mounted() {
    this.getEchartsData()
  },
  methods: {
    //获得图表数据
    getEchartsData() {
      if (this.oEchartsInstanceObject) {
        this.oEchartsInstanceObject.clear();
      }
      let info = {
        //x轴数据
        aXAxisData: [
          '数据', '数据0', '数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '数据7', '数据8', '数据9', '数据10', '数据11', '数据12', '数据13', '数据14', '数据15', '数据16', '数据17', '数据18', '数据19', '数据20'
        ],
        //派单数数据
        aEchartsSendOrderData: [
          100, 80, 70, 90, 50, 100, 80, 70, 90, 50, 100, 80, 70, 90, 50, 70, 90, 50, 50, 70, 90, 50
        ],
        //接单数数据
        aEchartsTakeOrderData: [
          50, 90, 70, 80, 100, 50, 90, 70, 80, 100, 50, 90, 70, 80, 100, 70, 80, 100, 100, 70, 80, 100
        ],
        //及时率数据
        aEchartsTimeLinesRate: [
          100, 80, 70, 90, 50, 100, 80, 70, 90, 50, 100, 80, 70, 90, 50, 70, 90, 50, 50, 70, 90, 50
        ],
        //完成率
        aEchartsFinisingRate: [
          50, 90, 70, 80, 100, 50, 90, 70, 80, 100, 50, 90, 70, 80, 100, 70, 80, 100, 100, 70, 80, 100
        ],
      };
      this.setEchartsData(info);
    },
    //图表初始化
    setEchartsData(e) {
      //x轴数据
      this.aXAxisData = e.aXAxisData;
      //派单数数据
      this.aEchartsSendOrderData = e.aEchartsSendOrderData;
      //接单数数据
      this.aEchartsTakeOrderData = e.aEchartsTakeOrderData;
      //及时率数据
      this.aEchartsTimeLinesRate = e.aEchartsTimeLinesRate;
      //完成率
      this.aEchartsFinisingRate = e.aEchartsFinisingRate;
      this.nEchartsDataLengthPercentage = Number(
        Math.floor(Number(100 / Math.floor(Number(this.aXAxisData.length / 4))))
      );
      // this.nEchartsDataLengthPercentage = 20;
      // console.log("当前一段百分增长比", this.nEchartsDataLengthPercentage);
      this.nEchartsScrollRightDistance = this.nEchartsDataLengthPercentage;
      //调用计算最大值函数
      let oYAxisMaxInterObject = this.setYAxisMaxInterval();
      //y轴的最大值及刻度线值
      this.oYAxisMaxInterObject = oYAxisMaxInterObject;
      this.oEchartsOptions = {
        backgroundColor: "",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        toolbox: {
          show: false,
        },
        grid: {
          left: "10",
          right: "10",
          top: "18%",
          height: 160,
          containLabel: true,
        },
        dataZoom: [
          {
            show: false, // 为true 滚动条出现
            type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            realtime: true, //是否实时更新视图
            start: 0, //开始位置
            end: this.nEchartsScrollRightDistance, //结束位置
            height: 0, // 表示滚动条的高度，也就是粗细
            // width:20,
            left: 10, //组件距离右边距离
            right: 5, //组件距离右边距离
            bottom: 8, //组件距离下边距离
            fillerColor: "rgba(70, 201, 255, 0.42)", //滚动条颜色
            borderColor: "rgba(45, 135, 174, 0.12)", //边框颜色
            handleSize: 0, //两边手柄尺寸
            showDetail: false, //拖拽时是否展示滚动条两侧文字
            zoomLock: true, //是否只平移不缩放
            moveOnMouseMove: false, //鼠标移动那个触发数据窗口平移
            // startValue:0,//从头开始
            // endValue:3,//最多几个
            // minValueSpan:3,//放大到最少几个
            // maxValueSpan:3,//缩小到最多几个
          },
          // {
          //   type:'inside',//支持鼠标内部滚动平移
          //   start:0,//开始
          //   // end:40,
          //   zoomOnMouseWheel:false,//关闭滚论缩放
          //   moveOnMouseWheel:true,//开始滚动平移
          //   moveOnMouseMove:true,//鼠标移动能触发数据窗口平移
          // }
        ],
        legend: [
          {
            top: "-5%",
            left: "5%",
            textStyle: {
              fontSize: 14,
            },
            itemGap: 30,
            itemHeight: 32,
            itemWidth: 32,
            data: [
              {
                name: "派单数",
                textStyle: {
                  color: "#fff",
                  padding: [5, 5, 5, 5],
                },
                icon: "image://http://cdn.lxculture.vip/echatBlue.png",
              },
              {
                name: "接单数",
                textStyle: {
                  color: "#fff",
                  padding: [5, 5, 5, 5],
                },
                icon: "image://http://cdn.lxculture.vip/echats.png",
              },
            ],
            height: 20,
          },
          {
            top: "0%",
            right: "5%",
            textStyle: {
              fontSize: 14,
            },
            itemGap: 17,
            itemHeight: 12,
            itemWidth: 12,
            data: [
              {
                name: "及时率",
                textStyle: {
                  color: "#fff",
                  padding: [15, 15, 15, 10],
                },
                icon: "image://http://cdn.lxculture.vip/echartsPink.png",
              },
              {
                name: "完成率",
                textStyle: {
                  color: "#fff",
                  padding: [15, 15, 15, 15],
                },
                icon: "image://http://cdn.lxculture.vip/echartsYeel.png",
              },
            ],
            height: 20,
          },
        ],
        xAxis: [
          {
            data: this.aXAxisData,
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
              //使x轴文字显示完全
              interval: 0,
              margin: 20,
              formatter: function (value) {
                let str = "";
                let num = 4; //每行显示字数
                let valLength = value.length; //该项x轴字数
                let rowNum = Math.ceil(valLength / num); // 行数

                if (rowNum > 1) {
                  for (let i = 0; i < rowNum; i++) {
                    let temp = "";
                    let start = i * num;
                    let end = start + num;

                    temp = value.substring(start, end) + "\n";
                    str += temp;
                  }
                  return str;
                } else {
                  return value;
                }
              },
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
            max: this.oYAxisMaxInterObject.max,
            interval: this.oYAxisMaxInterObject.interval,
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
          {
            type: "value",
            name: "",
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
              formatter: "{value} %",
            },
            //#y轴标线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: "#163342",
              },
            },
          },
        ],
        series: [
          {
            name: "派单数",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: this.aEchartsSendOrderData,

            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [25, 25, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "#02dbef" },
                  { offset: 1, color: "rgb(2,218,239,0.1)" },
                ]),
              },
            },
          },
          {
            name: "接单数",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: this.aEchartsTakeOrderData,
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [25, 25, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  { offset: 0, color: "#00ee7a" },
                  { offset: 1, color: "rgb(1,234,122,0.6)" },
                ]),
              },
            },
            //设置多个bar之间的间距
            barGap: 0.5,
          },
          {
            name: "及时率",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return value + "%";
              },
            },
            //折线中间点的类型
            symbol: "circle",
            //折线中间点的大小
            symbolSize: 6,
            //设置该类型的样式
            itemStyle: {
              normal: {
                color: "#eedb04",
                lineStyle: {
                  color: "#eedb04",
                },
              },
            },
            data: this.aEchartsTimeLinesRate,
          },
          {
            name: "完成率",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return value + "%";
              },
            },
            //折线中间点的类型
            symbol: "circle",
            //折线中间点的大小
            symbolSize: 6,
            //设置该类型的样式
            itemStyle: {
              normal: {
                color: "#fc66c7",
                lineStyle: {
                  color: "#fc66c7",
                },
              },
            },
            data: this.aEchartsFinisingRate,
          },
        ],
      };
      this.oEchartsInstanceObject = echarts.init(this.$refs.CarouselEcharts);
      this.oEchartsInstanceObject.setOption(this.oEchartsOptions);
      window.addEventListener("resize", () => {
        this.oEchartsInstanceObject.resize();
      });
      //调用定时任务
      this.scrollEchartsTime();
    },
    //定时滚动图表
    scrollEchartsTime() {
      clearInterval(this.oEchartsTime);
      this.oEchartsTime = setInterval(() => {
        if (this.nEchartsScrollRightDistance + this.nEchartsDataLengthPercentage > 100) {
          this.nEchartsScrollLeftDistance = 0;
          this.nEchartsScrollRightDistance = this.nEchartsDataLengthPercentage;
          let info = this.oEchartsOptions;
          info.dataZoom[0].start = 0;
          info.dataZoom[0].end = this.nEchartsDataLengthPercentage;
          this.oEchartsInstanceObject.setOption(info);
        } else {
          this.moveEchartsRight();
        }
      }, 2000);
    },
    //图表移入事件
    enterEchartsEvent() {
      // console.log("我移入了");
      clearInterval(this.oEchartsTime);
    },
    //图表移出事件
    leaveEchartsEvent() {
      // console.log("我移出了");
      //调用定时任务
      this.scrollEchartsTime();
    },
    //图表左移动
    moveEchartsLeft() {
      if (this.nEchartsScrollLeftDistance - this.nEchartsDataLengthPercentage <= 0) {
        this.nEchartsScrollLeftDistance = 0;
      } else {
        this.nEchartsScrollLeftDistance -= this.nEchartsDataLengthPercentage;
      }
      this.nEchartsScrollRightDistance -= this.nEchartsDataLengthPercentage;
      let yAxisInfo = this.setYAxisMaxInterval();
      let info = this.oEchartsOptions;
      info.yAxis[0].max = yAxisInfo.max;
      info.yAxis[0].interval = yAxisInfo.interval;
      info.dataZoom[0].start = this.nEchartsScrollLeftDistance;
      info.dataZoom[0].end = this.nEchartsScrollRightDistance;
      this.oEchartsInstanceObject.setOption(info);
      // console.log("左", this.nEchartsScrollLeftDistance, this.nEchartsScrollRightDistance);
      if (this.nEchartsScrollRightDistance - this.nEchartsDataLengthPercentage <= 0) {
        this.bEchartsButtonArrowsShow = false;
      }
    },
    //图表右移动
    moveEchartsRight() {
      this.nEchartsScrollLeftDistance = this.nEchartsScrollRightDistance;
      if (this.nEchartsScrollRightDistance + this.nEchartsDataLengthPercentage >= 100) {
        this.nEchartsScrollRightDistance = 100;
      } else {
        this.nEchartsScrollRightDistance += this.nEchartsDataLengthPercentage;
      }
      let yAxisInfo = this.setYAxisMaxInterval();
      let info = this.oEchartsOptions;
      info.yAxis[0].max = yAxisInfo.max;
      info.yAxis[0].interval = yAxisInfo.interval;
      info.dataZoom[0].start = this.nEchartsScrollLeftDistance;
      info.dataZoom[0].end = this.nEchartsScrollRightDistance;
      this.oEchartsInstanceObject.setOption(info);
      // console.log("右", this.nEchartsScrollLeftDistance, this.nEchartsScrollRightDistance);
      // console.log("info", info.dataZoom[0].start, info.dataZoom[0].end);
      if (this.nEchartsScrollLeftDistance + this.nEchartsDataLengthPercentage >= 100) {
        this.bEchartsButtonArrowsShow = true;
      }
    },
    //动态计算最大值
    setYAxisMaxInterval() {
      //设置初始值的最大值
      let seriesJdsMax = -1;
      let seriesWclMax = -1;
      let minNum = Math.floor(
        Number(this.aXAxisData.length * (this.nEchartsScrollLeftDistance * 0.1) * 0.1)
      );
      let maxNum = Math.floor(
        Number(this.aXAxisData.length * (this.nEchartsScrollRightDistance * 0.1) * 0.1)
      );
      if (maxNum >= this.aXAxisData.length) maxNum = Number(this.aXAxisData.length - 1);
      for (let i = minNum; i < maxNum; i++) {
        // console.log(minNum);
        // console.log(maxNum);
        if (seriesJdsMax < this.aEchartsSendOrderData[i]) {
          seriesJdsMax = this.aEchartsSendOrderData[i];
        }
        if (seriesWclMax < this.aEchartsFinisingRate[i]) {
          seriesWclMax = this.aEchartsFinisingRate[i];
        }
      }
      let yAxisMAX = seriesJdsMax < seriesWclMax ? seriesWclMax : seriesJdsMax;
      // console.log(seriesJdsMax, seriesWclMax, yAxisMAX);
      //y轴的最大值及刻度线值
      let maxInfo = {
        max: yAxisMAX,
        interval: yAxisMAX / 4,
      };
      return maxInfo;
    },
  }
}
</script>
