<style lang="scss" scoped>
@import "../index.scss";
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child" ref="ehcartsMapBifoldLines">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'echartsMapBifoldLine',

  data() {
    return {
      oBifoldLineData: null,
    };
  },

  mounted() {
    this.getBifoldLineData()
  },

  methods: {
    //获取折线数据
    getBifoldLineData() {
      let info = {
        //x轴数据
        xAxis: [],
        //正面信息
        seriesEcharts2023: [],
        //负面信息
        seriesEcharts2022: [],
      };
      let newName = [
        { date: "0123", "正面信息": 100, "负面信息": 200 },
        { date: "0223", "正面信息": 200, "负面信息": 300 },
        { date: "0323", "正面信息": 300, "负面信息": 400 },
        { date: "0423", "正面信息": 400, "负面信息": 500 },
        { date: "0523", "正面信息": 500, "负面信息": 600 },
        { date: "0623", "正面信息": 600, "负面信息": 700 },
        { date: "0723", "正面信息": 500, "负面信息": 600 },
        { date: "0823", "正面信息": 400, "负面信息": 500 },
        { date: "0923", "正面信息": 300, "负面信息": 400 },
        { date: "1123", "正面信息": 200, "负面信息": 300 },
        { date: "1223", "正面信息": 100, "负面信息": 200 },
      ]
      newName.map((item, index) => {
        if (index > 11) {
          return;
        }
        let xLeft = item.date.slice(0, 2);
        let xRight = item.date.slice(2, 4);
        info.xAxis.push(xLeft + "/" + xRight);
        if (item["正面信息"]) {
          info.seriesEcharts2023.push(item["正面信息"]);
        } else {
          info.seriesEcharts2023.push(0);
        }
        if (item["负面信息"]) {
          info.seriesEcharts2022.push(item["负面信息"]);
        } else {
          info.seriesEcharts2022.push(0);
        }
      });
      this.setBifoldLineData(info);
    },
    //赋值折线图
    setBifoldLineData(info) {
      //舆情分析数据
      //x轴数据
      let xAxis = info.xAxis;
      //2023数据
      let seriesEcharts2023 = info.seriesEcharts2023;
      //2022数据
      let seriesEcharts2022 = info.seriesEcharts2022;
      //设置初始值的最大值
      let seriesJdsMax = -1;
      let seriesWclMax = -1;
      for (let i = 0; i < seriesEcharts2023.length; i++) {
        if (seriesJdsMax < seriesEcharts2023[i]) {
          seriesJdsMax = seriesEcharts2023[i];
        }
        if (seriesWclMax < seriesEcharts2022[i]) {
          seriesWclMax = seriesEcharts2022[i];
        }
      }
      let yAxisMAX = seriesJdsMax < seriesWclMax ? seriesWclMax : seriesJdsMax;
      // console.log(seriesJdsMax, seriesWclMax, yAxisMAX);
      //y轴的最大值及刻度线值
      let maxInfo = {
        max: Math.round(yAxisMAX),
        interval: Math.round(yAxisMAX / 4),
      };
      this.oBifoldLineData = {
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
          width: '96%',
          height: 200,
          left: "2%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        legend: {
          top: "-2%",
          right: "10%",
          textStyle: {
            fontSize: 14,
          },
          itemGap: 30,
          itemHeight: 32,
          itemWidth: 32,
          data: [
            {
              name: "负面信息",
              textStyle: {
                color: "#fff",
                padding: [0, 0, 0, 7],
              },
              icon: "image://http://cdn.lxculture.vip/echats.png",
            },
            {
              name: "正面信息",
              textStyle: {
                color: "#fff",
                padding: [0, 0, 0, 7],
                icon: "triangle",
              },
              icon: "image://http://cdn.lxculture.vip/echatBlue.png",
            },
          ],
        },
        xAxis: [
          {
            data: xAxis,
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
              margin: 25,
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
            max: maxInfo.max,
            interval: maxInfo.interval,
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
        ],
        series: [
          {
            name: "负面信息",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            //折线中间点的类型
            symbol: "image://http://cdn.lxculture.vip/echats.png",
            //折线中间点的大小
            symbolSize: 32,
            //设置该类型的样式
            itemStyle: {
              normal: {
                color: "rgb(61, 248, 171)",
                lineStyle: {
                  color: "rgb(61, 248, 171)",
                  width: 2,
                },
              },
            },
            data: seriesEcharts2022,
          },
          {
            name: "正面信息",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            //折线中间点的类型
            symbol: "image://http://cdn.lxculture.vip/echatBlue.png",
            //折线中间点的大小
            symbolSize: 32,
            //设置该类型的样式
            itemStyle: {
              normal: {
                color: "rgb(0, 128, 206)",
                lineStyle: {
                  color: "rgb(0, 128, 206)",
                  width: 2,
                },
              },
            },
            data: seriesEcharts2023,
          },
        ],
      };
      this.myChart = window.echarts.init(this.$refs.ehcartsMapBifoldLines);
      this.myChart.setOption(this.oBifoldLineData);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  },
};
</script>
