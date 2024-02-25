<style lang="scss" scoped>
.echartsMapChina{
  position: relative;
  width: 936px;
  height: 616px;
  padding-top: 9px;
  box-sizing: border-box;
  background: url("http://cdn.lxculture.vip/mapChinaBgs.png") no-repeat no-repeat;
  background-size: 100% 100%;

  .chinaEcharts {
    width: 100%;
    height: 577px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
      background: url("http://cdn.lxculture.vip/mapChinaBg.png") no-repeat no-repeat;
  background-size: 100% 100%;
  }
}
</style>
<template>
  <div class="echartsMapChina">
    <div class="chinaEcharts" ref="echartsMapChinas"></div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name : "echartsMap",
  data(){
    return {
      mapData: [],
      echartsMapImg: "http://cdn.lxculture.vip/mapChinaMapBg.png",
    }
  },
  computed: {
    options() {
      return {
        // backgroundColor: "black",
        //3d地图配置部分
        geo: {
          show: true,
          map: "china",
          // aspectScale: 0.8, //长宽比
          zoom: 1.2,
          top: "10%",
          left: "center",
          label: {
            show: false,
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#C0E9FB",
              borderWidth: 2,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, 0.1)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            emphasis: {
              areaColor: "",
            },
          },
        },
          graphic: [
          {
            type: "image",
            style: {
              image: this.echartsMapImg,
              width: 742,
              height: 610,
              x: 96,
              y:6,
            },
          },
        ],
        series: {
          name: "中国",
          type: "map",
          mapType: "china", // 自定义扩展图表类型
          // aspectScale: 0.8, //长宽比
          zoom: 1.2,
          top: "10%",
          left: "center",
          roam: false,
          label: {
            show: false,
            color: "#FFF",
            fontSize: 12,
            emphasis: {
              color: "#FFF",
            },
          },
          itemStyle: {
            normal: {
              backgroundColor: "#87C4DE",
              borderWidth: 2,
              areaColor: "",
              borderColor: "",
            },
            emphasis: {
              label: {
                // show: false,
                textStyle: {
                  fontWeight: "bold",
                  fontSize: "16",
                },
              },
              areaColor: "",
            },
          },
          data: this.mapData,
          selectedMode: false,
        },
      };
    },
  },
  beforeCreate(){

  },
  created(){

  },
  watch:{
  },
  mounted() {
    // 获取地图数据
    this.getMapInfo();
  },
  methods: {
    // 获取地图信息
    getMapInfo() {
       this.$axios.get("../../mapJson/china.json").then((res) => {
        if (res) {
          // console.log("地图数据", res);
          res.features.forEach((e) => {
            this.mapData.push({
              name: e.properties.name, //区块名称
              label: { color: "#fff" },
              itemStyle: {
                normal: {
                  areaColor: {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(85 122, 177, 0.2)", // 100% 处的颜色
                      },
                    ],
                    globalCoord: false, // 缺省为 false
                  },
                  borderColor: "#C0E9FB",
                  borderWidth: 2,
                },
              },
              isClick: false,
            });
          });
          window.echarts.registerMap("china", res);
          this.myChart = window.echarts.init(this.$refs.echartsMapChinas);
          this.myChart.setOption(this.options, true);
          window.addEventListener("resize",()=>{
              this.myChart.resize();
          });
          this.initMapClick();
          // console.log('@',this.mapData,this.options)
        }
      });
    },
    //地图点击
    initMapClick() {
      this.myChart.on("click", (params) => {
        // console.log("当前的params", params);
        // this.$emit("mapClick", params);
        Message({
          message: params.data?.name,
          type: 'success',
        });
        this.mapData.forEach((item) => {
          if (item.name == params.data?.name) {
            if (item.isClick == false) {
              // 设置高亮 设置为选中区域数据
              item.isClick = true;
              item.itemStyle.normal.areaColor = "rgba(85 122, 177, 0.8)";
            } else {
              // 取消高亮 设置为全部数据
              item.isClick = false;
              item.itemStyle.normal.areaColor = {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, 0.2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              };
            }
          } else {
            // 取消其余部分高亮
            item.isClick = false;
            item.itemStyle.normal.areaColor = {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147, 235, 248, 0.2)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            };
          }
        });
        this.myChart.setOption(this.options, true);
      });
    },
    //地图变成默认
    initMapDefind() {
      this.mapData.forEach((item) => {
        // 取消其余部分高亮
        item.isClick = false;
        item.itemStyle.normal.areaColor = {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, 0.2)", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        };
      });
      this.myChart.setOption(this.options, true);
    },
  }
}
</script>
