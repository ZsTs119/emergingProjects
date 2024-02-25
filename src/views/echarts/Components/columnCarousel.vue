<style lang="scss" scoped>
.echartsColumCarousel{
  width: 100%;
  min-height: 302px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  .echarts {
    margin: 0 auto;
    width: 60%;
    height: 211px;
    background-color:#020c19;
  }
  .echartsButton{
    position: relative;
    width:60%;
    height: 8px;
    background: url("http://cdn.lxculture.vip/carouselBg.png") no-repeat no-repeat;
    background-size: 100% 100%;
    background-color:#020c19;

    .buttonLeft{
      position: absolute;
      width: 40px;
      height: 40px;
      left: 0;
      top: -30px;
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
      top: -30px;
      background: url("http://cdn.lxculture.vip/carouselRightIcon.png") no-repeat
        no-repeat;
      z-index: 2;
      background-size: 100% 100%;
    }
  }
}
 @media (min-width:1440px) {
    .echarts {
      width: 40%;
      height: 211px;
      background-color:#020c19;
    }
    .echartsButton{
      width: 40%;
      height: 8px;
    }
  }
</style>
<template>
  <div class="echartsColumCarousel" @mouseenter="ecahrtsMouseenter" @mouseleave="echartsMouseleave">
    <div class="echarts" ref="ColumCarouselEcharts"></div>
    <div class="echartsButton">
      <div class="buttonLeft" v-if="echartsLeftRightButton || right - echartZoomNum != 0" @click="EchartsLeft"></div>
      <div class="buttonRight" v-if="!echartsLeftRightButton || left + echartZoomNum < 100" @click="EchartsRight"></div>
    </div>
  </div>
</template>

<script>
export default {
  name : "echartsColumCarousel",
  data(){
    return {
      data: [],
      myChart: null,
      //图表变量
      options: null,
      yAxisLefts: null,
      yAxisRightjsl: null,
      yAxisRightwcl: null,
      yAxisjsl: null,
      yAxiswcl: null,
      seriesPdss: null,
      seriesJdss: null,
      //图表滚动变量
      left: 0,
      right: 25,
      //赋值图表的显示百分进度
      echartZoomNum: null,
      //自动滚动定时器
      scroTimeEcharts: null,
      //控制箭头的显隐
      echartsLeftRightButton: false,
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
        //y轴左侧数据
        yAxisLeft: [
          '数据','数据0','数据1','数据2','数据3', '数据4','数据5','数据6','数据7','数据8', '数据9','数据10','数据11','数据12','数据13','数据14','数据15','数据16','数据17','数据18','数据19','数据20'
        ],
        //y轴右侧数据
        yAxisjsl: [  10,80,70,90,50,100,80,70,90,50,100,80,70,90,50,70,90,50,50,70,90,50],
        yAxiswcl: [  5,90,70,80,100, 50,90,70,80,100, 50,90,70,80,100,70,80,100,100,70,80,100],
        yAxisRightjsl: ["100%","80%","70%","90%","50%","100%","80%","70%","90%","50%","100%","80%","70%","90%","50%","100%","80%","70%","90%","50%",],
        yAxisRightwcl: ["50%","90%","70%","80%","100%","50%","90%","70%","80%","100%","50%","90%","70%","80%","100%","50%","90%","70%","80%","100%",],
        //派单数数据
        seriesPds: [5,20,7,40,100,5,20,7,40,100,5,20,7,40,100,5,20,7,40,100,],
        //接单数数据
        seriesJds: [10,10,30,90,50,10,10,30,90,50,10,10,30,90,50,10,10,30,90,50,],
      };
      this.ChartData(info);
    },
      //图表初始化
    ChartData(info) {
      //y轴左侧数据
      this.yAxisLefts = info.yAxisLeft;
      //y轴右侧数据
      this.yAxisRightjsl = info.yAxisRightjsl;
      this.yAxisRightwcl = info.yAxisRightwcl;
      this.yAxisjsl = info.yAxisjsl;
      this.yAxiswcl = info.yAxiswcl;
      //派单数数据
      this.seriesPdss = info.seriesPds;
      //接单数数据
      this.seriesJdss = info.seriesJds;
      this.echartZoomNum = Number(
        Math.floor(Number(100 / Math.floor(Number(this.yAxisLefts.length / 4))))
      );
      // console.log("当前一段百分增长比", this.echartZoomNum);
      this.right = this.echartZoomNum;
      this.options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: [
          {
            top: "-5%",
            left: "5%",
            height: 20,
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
                icon: "image://http://cdn.lxculture.vip/echartsLength.png",
              },
            ],
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
        dataZoom: [
          {
            show: false, // 为true 滚动条出现
            type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            yAxisIndex: [0, 1, 2, 3],
            realtime: true, //是否实时更新视图
            start: 0, //开始位置
            end: this.right, //结束位置
            height: 0, // 表示滚动条的高度，也就是粗细
            // width:20,
            left: 10, //组件距离右边距离
            right: 10, //组件距离右边距离
            bottom: -20, //组件距离下边距离
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
          //   type: "inside", //支持鼠标内部滚动平移
          //   start: 0, //开始
          //   orient: "vertical",
          //   // end:40,
          //   zoomOnMouseWheel: false, //关闭滚论缩放
          //   moveOnMouseWheel: true, //开始滚动平移
          //   moveOnMouseMove: true, //鼠标移动能触发数据窗口平移
          // },
        ],
        grid: {
          height: 180,
          top: "17%",
          left: "20",
          right: "0",
          // bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          max: 50,
        },
        yAxis: [
          {
            type: "category",
            //y轴线是否显示
            axisLine: {
              show: false,
            },
            //#y轴文字标签
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            //y轴刻度是否显示
            axisTick: {
              show: false,
            },
            //y轴对默认的偏移位置
            offset: 10,
            data: this.yAxisLefts,
          },
          {
            type: "category",
            //y轴线是否显示
            axisLine: {
              show: false,
            },
            //#y轴文字标签
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ff67cb",
              },
            },
            //y轴刻度是否显示
            axisTick: {
              show: false,
            },
            //y轴对默认的偏移位置
            offset: 0,
            data: this.yAxisRightjsl,
          },
          {
            type: "category",
            //y轴线是否显示
            axisLine: {
              show: false,
            },
            //#y轴文字标签
            axisLabel: {
              show: true,
              textStyle: {
                color: "#efdd00",
              },
            },
            //y轴刻度是否显示
            axisTick: {
              show: false,
            },
            //y轴对默认的偏移位置
            offset: 30,
            data: this.yAxisRightwcl,
          },
        ],
        series: [
          {
            name: "接单数",
            type: "bar",
            barWidth: "20",
            emphasis: {
              focus: "series",
            },
            tooltip: {
              valueFormatter: function(value) {
                return value + "%";
              },
            },
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [25, 25, 25, 25],
                color: "rgb(0, 83, 136)",
              },
            },
            zlevel: 3,
            data: this.seriesJdss,
          },
          {
            //设置柱状图的距离，设-100%时,将会堆叠
            barGap: "-100%",
            name: "派单数",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            tooltip: {
              valueFormatter: function(value) {
                return value + "%";
              },
            },
            //是否显示柱状图阴影
            showBackground: true,
            //设置柱状图阴影的样式
            backgroundStyle: {
              //设置柱状图阴影的圆角
              borderRadius: [25, 25, 25, 25],
              color: "#072a46",
            },
            //设置图形宽度
            barWidth: "20",
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [25, 25, 25, 25],
                //自定义柱状图的颜色渐变 new  echarts.graphic.LinearGradient()
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  { offset: 1, color: "rgb(44, 199, 245)" },
                  { offset: 0, color: "rgb(44, 199, 245,0)" },
                ]),
              },
            },
            zlevel: 3,
            data: this.seriesPdss,
          },
          {
            //设置柱状图的距离，设-100%时,将会堆叠
            barGap: "-100%",
            name: "及时率",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            tooltip: {
              valueFormatter: function(value) {
                return value + "%";
              },
            },
            //是否显示柱状图阴影
            showBackground: true,
            //设置柱状图阴影的样式
            backgroundStyle: {
              //设置柱状图阴影的圆角
              borderRadius: [25, 25, 25, 25],
              color: "#072a46",
            },
            //设置图形宽度
            barWidth: "20",
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [25, 25, 25, 25],
                //自定义柱状图的颜色渐变 new  echarts.graphic.LinearGradient()
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  { offset: 1, color: "rgb(44, 199, 245,0)" },
                  { offset: 0, color: "rgb(44, 199, 245,0)" },
                ]),
              },
            },
            zlevel: 1,
            data: this.yAxisjsl,
          },
          {
            //设置柱状图的距离，设-100%时,将会堆叠
            barGap: "-100%",
            name: "完成率",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            tooltip: {
              valueFormatter: function(value) {
                return value + "%";
              },
            },
            //是否显示柱状图阴影
            showBackground: true,
            //设置柱状图阴影的样式
            backgroundStyle: {
              //设置柱状图阴影的圆角
              borderRadius: [25, 25, 25, 25],
              color: "#072a46",
            },
            //设置图形宽度
            barWidth: "20",
            itemStyle: {
              normal: {
                //设置图形圆角
                barBorderRadius: [25, 25, 25, 25],
                //自定义柱状图的颜色渐变 new  echarts.graphic.LinearGradient()
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  { offset: 1, color: "rgb(44, 199, 245,0)" },
                  { offset: 0, color: "rgb(44, 199, 245,0)" },
                ]),
              },
            },
            zlevel: 1,
            data: this.yAxiswcl,
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.ColumCarouselEcharts);
      this.myChart.setOption(this.options);
      window.addEventListener("resize",()=>{
          this.myChart.resize();
      });
      //调用定时任务
      this.echartsTime();
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
    //图表左移动
    EchartsLeft() {
      if (this.left - this.echartZoomNum <= 0) {
        this.left = 0;
      } else {
        this.left -= this.echartZoomNum;
      }
      this.right -= this.echartZoomNum;
      let info = this.options;
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
      let info = this.options;
      info.dataZoom[0].start = this.left;
      info.dataZoom[0].end = this.right;
      this.myChart.setOption(info);
      // console.log("右", this.left, this.right);
      if (this.left + this.echartZoomNum >= 100) {
        this.echartsLeftRightButton = true;
      }
    },
  }
}
</script>
