<style lang="scss" scoped>
.echartsCarousel{
  width: 100%;
  min-height: 302px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  .echarts {
    margin: 0 auto;
    width: 80%;
    height: 211px;
    background-color:#020c19;

  }
  .echartsButton{
    position: relative;
    width:80%;
    height: 8px;
    background: url("http://cdn.lxculture.vip/carouselBg.png") no-repeat no-repeat;
    background-size: 100% 100%;
    background-color:#020c19;

    .buttonLeft{
      position: absolute;
      width: 40px;
      height: 40px;
      left: 0;
      top: -40px;
      background: url("http://cdn.lxculture.vip/carouselLeftIcon.png") no-repeat
        no-repeat;
      z-index: 2;
      background-size: 100% 100%;
    }
    .buttonRight{
      position: absolute;
      width: 40px;
      height: 40px;
      right: 0;
      top: -40px;
      background: url("http://cdn.lxculture.vip/carouselRightIcon.png") no-repeat
        no-repeat;
      z-index: 2;
      background-size: 100% 100%;
    }
  }
  @media (min-width:1440px) {
    .echarts {
      width: 60%;
      height: 211px;
      background-color:#020c19;
    }
    .echartsButton{
      width: 60%;
      height: 8px;
    }
  }
}
</style>
<template>
  <div class="echartsCarousel" @mouseenter="ecahrtsMouseenter" @mouseleave="echartsMouseleave">
    <div class="echarts" ref="CarouselEcharts"></div>
    <div class="echartsButton">
      <div class="buttonLeft" v-if="echartsLeftRightButton || right - echartZoomNum != 0" @click="EchartsLeft"></div>
      <div class="buttonRight" v-if="!echartsLeftRightButton || left + echartZoomNum < 100" @click="EchartsRight"></div>
    </div>
  </div>
</template>

<script>
export default {
  name : "echartsCarousel",
  data(){
    return {
      data: [],
      myChart: null,
      //图表数组
      options: null,
      left: 0,
      right: 25,
      //赋值图表的显示百分进度
      echartZoomNum: null,
      //控制箭头的显隐
      echartsLeftRightButton: false,
      //图表数据
      //x轴数据
      xAxis: null,
      //派单数数据
      seriesPds: null,
      //接单数数据
      seriesJds: null,
      //及时率数据
      seriesJsl: null,
      //完成率
      seriesWcl: null,
      //y轴数据
      yAxisMaxAndInterval: null,
      //自动滚动定时器
      scroTimeEcharts: null,
    }
  },
  beforeCreate(){

  },
  created(){

  },
  beforeDestroy() {
    window.removeEventListener("resize",()=>{
        this.myChart.resize();
    });
    clearInterval(this.scroTimeEcharts);
  },
  watch:{
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData() {
      if (this.myChart) {
        this.myChart.clear();
      }
      let info = {
        //x轴数据
        xAxis: [
          '数据','数据0','数据1','数据2','数据3', '数据4','数据5','数据6','数据7','数据8', '数据9','数据10','数据11','数据12','数据13','数据14','数据15','数据16','数据17','数据18','数据19','数据20'
        ],
        //派单数数据
        seriesPds: [
          100,80,70,90,50,100,80,70,90,50,100,80,70,90,50,70,90,50,50,70,90,50
        ],
        //接单数数据
        seriesJds: [
          50,90,70,80,100, 50,90,70,80,100, 50,90,70,80,100,70,80,100,100,70,80,100
        ],
        //及时率数据
        seriesJsl: [
          100,80,70,90,50,100,80,70,90,50,100,80,70,90,50,70,90,50,50,70,90,50
        ],
        //完成率
        seriesWcl: [
          50,90,70,80,100,50,90,70,80,100,50,90,70,80,100,70,80,100,100,70,80,100
        ],
      };
      this.ChartData(info);
    },
    //图表初始化
    ChartData(e) {
      //x轴数据
      this.xAxis = e.xAxis;
      //派单数数据
      this.seriesPds = e.seriesPds;
      //接单数数据
      this.seriesJds = e.seriesJds;
      //及时率数据
      this.seriesJsl = e.seriesJsl;
      //完成率
      this.seriesWcl = e.seriesWcl;
      this.echartZoomNum = Number(
        Math.floor(Number(100 / Math.floor(Number(this.xAxis.length / 4))))
      );
      // this.echartZoomNum = 20;
      // console.log("当前一段百分增长比", this.echartZoomNum);
      this.right = this.echartZoomNum;
      //调用计算最大值函数
      let yAxisInfo = this.LoseMax();
      //y轴的最大值及刻度线值
      this.yAxisMaxAndInterval = yAxisInfo;
      this.options = {
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
            end: this.right, //结束位置
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
            data: this.xAxis,
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
              formatter: function(value) {
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
            max: this.yAxisMaxAndInterval.max,
            interval: this.yAxisMaxAndInterval.interval,
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
              valueFormatter: function(value) {
                return value;
              },
            },
            data: this.seriesPds,

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
              valueFormatter: function(value) {
                return value;
              },
            },
            data: this.seriesJds,
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
              valueFormatter: function(value) {
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
            data: this.seriesJsl,
          },
          {
            name: "完成率",
            type: "line",
            tooltip: {
              valueFormatter: function(value) {
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
            data: this.seriesWcl,
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.CarouselEcharts);
      this.myChart.setOption(this.options);
      window.addEventListener("resize",()=>{
          this.myChart.resize();
      });
      //调用定时任务
      this.echartsTime();
    },
    //定时滚动图表
    echartsTime() {
      clearInterval(this.scroTimeEcharts);
      this.scroTimeEcharts = setInterval(() => {
        if (this.right + this.echartZoomNum > 100) {
          this.left = 0;
          this.right = this.echartZoomNum;
          let info = this.options;
          info.dataZoom[0].start = 0;
          info.dataZoom[0].end = this.echartZoomNum;
          this.myChart.setOption(info);
        } else {
          this.EchartsRight();
        }
      }, 2000);
    },
    //图表移入事件
    ecahrtsMouseenter() {
      // console.log("我移入了");
      clearInterval(this.scroTimeEcharts);
    },
    //图表移出事件
    echartsMouseleave() {
      // console.log("我移出了");
      //调用定时任务
      this.echartsTime();
    },
    //图表左移动
    EchartsLeft() {
      if (this.left - this.echartZoomNum <= 0) {
        this.left = 0;
      } else {
        this.left -= this.echartZoomNum;
      }
      this.right -= this.echartZoomNum;
      let yAxisInfo = this.LoseMax();
      let info = this.options;
      info.yAxis[0].max = yAxisInfo.max;
      info.yAxis[0].interval = yAxisInfo.interval;
      info.dataZoom[0].start = this.left;
      info.dataZoom[0].end = this.right;
      this.myChart.setOption(info);
      // console.log("左", this.left, this.right);
      if (this.right - this.echartZoomNum <= 0) {
        this.echartsLeftRightButton = false;
      }
    },
    //图表右移动
    EchartsRight() {
      this.left = this.right;
      if (this.right + this.echartZoomNum >= 100) {
        this.right = 100;
      } else {
        this.right += this.echartZoomNum;
      }
      let yAxisInfo = this.LoseMax();
      let info = this.options;
      info.yAxis[0].max = yAxisInfo.max;
      info.yAxis[0].interval = yAxisInfo.interval;
      info.dataZoom[0].start = this.left;
      info.dataZoom[0].end = this.right;
      this.myChart.setOption(info);
      // console.log("右", this.left, this.right);
      // console.log("info", info.dataZoom[0].start, info.dataZoom[0].end);
      if (this.left + this.echartZoomNum >= 100) {
        this.echartsLeftRightButton = true;
      }
    },
    //动态计算最大值
    LoseMax() {
      //设置初始值的最大值
      let seriesJdsMax = -1;
      let seriesWclMax = -1;
      let minNum = Math.floor(
        Number(this.xAxis.length * (this.left * 0.1) * 0.1)
      );
      let maxNum = Math.floor(
        Number(this.xAxis.length * (this.right * 0.1) * 0.1)
      );
      if (maxNum >= this.xAxis.length) maxNum = Number(this.xAxis.length - 1);
      for (let i = minNum; i < maxNum; i++) {
        // console.log(minNum);
        // console.log(maxNum);
        if (seriesJdsMax < this.seriesPds[i]) {
          seriesJdsMax = this.seriesPds[i];
        }
        if (seriesWclMax < this.seriesWcl[i]) {
          seriesWclMax = this.seriesWcl[i];
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
