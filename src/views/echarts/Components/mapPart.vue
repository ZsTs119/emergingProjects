<style lang="scss" scoped>
@import "../index.scss";

.echarts-map__ruian-outer-ring {
  position: absolute;
  width: 678px;
  height: 678px;
  top: 30px;
  left: 268px;
  background: url("http://cdn.lxculture.vip/mapPartMapBgOuterRingBg.png") no-repeat no-repeat;
  background-size: 100% 100%;
  transform: rotate(0deg);
  animation: echarts-map__ruian-outer-ring-ani 18s linear infinite;
}

@keyframes echarts-map__ruian-outer-ring-ani {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.echarts-map__ruian {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 920px;
  height: 726px;
  transform: translate(-50%, -45%);
  z-index: 2;
}
</style>
<template>
  <div class="echarts-map" ref="ShowMessageDiv">
    <div class="echarts-map__ruian-outer-ring"></div>
    <div class="echarts-map__ruian" ref="echartsMapPart"></div>
  </div>
</template>

<script>
import { showMessage } from "@/utils";
export default {
  name: "echartsMapPart",
  data() {
    return {
      aMapJsonData: [],
      sEchartsMapImgUrl: "http://cdn.lxculture.vip/mapPartMapBg.png",
    }
  },
  beforeCreate() {

  },
  created() {

  },
  computed: {
    oMapOptions() {
      return {
        // backgroundColor: "black",
        //3d地图配置部分
        geo: {
          show: true,
          map: "china",
          roam: false,
          center: [120.506779173, 27.884877998],
          // roam: true,
          aspectScale: 1, //长宽比
          zoom: 25,
          top: "-17%",
          left: "16.5%",
          label: {
            show: false,
            color: "#ccc",
            fontSize: 18,
            fontWeight: "bold",
            emphasis: {
              color: "#FFF",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#81ddff",
              borderWidth: 2,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(11, 54, 93, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(11, 54, 93, 0.4)", // 100% 处的颜色
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
              image: this.sEchartsMapImgUrl,
              width: 1140,
              height: 780,
              x: -62,
              y: -52,
            },
          },
        ],
        series: {
          show: false,
          name: "中国",
          type: "map",
          mapType: "china", // 自定义扩展图表类型
          roam: false,
          center: [120.506779173, 27.884877998],
          aspectScale: 1, //长宽比
          zoom: 25,
          top: "-17%",
          left: "16.5%",
          roam: false,
          label: {
            show: true,
            color: "#ccc",
            fontWeight: "bold",
            fontSize: 18,
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
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "22",
                },
              },
              areaColor: "transparent",
            },
          },
          data: this.aMapJsonData,
          selectedMode: false,
        },
      };
    },
  },
  watch: {
  },
  mounted() {
    // 获取地图数据
    this.getMapData();
  },
  methods: {
    // 获取地图信息
    getMapData() {
      this.$axios.get("../../mapJson/330381.json").then((res) => {
        if (res) {
          // console.log("地图数据", res.features);
          res.features.forEach((e) => {
            this.aMapJsonData.push({
              name: e.properties.name, //区块名称
              label: { color: "#ccc" },
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
                        color: "rgba(11, 54, 93, 0)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(11, 54, 93, 0.4)", // 100% 处的颜色
                      },
                    ],
                    globalCoord: false, // 缺省为 false
                  },
                  borderColor: "#81ddff",
                  borderWidth: 2,
                },
              },
              isClick: false,
            });
          });
          window.echarts.registerMap("china", res);
          this.myChart = window.echarts.init(this.$refs.echartsMapPart);
          this.myChart.setOption(this.oMapOptions, true);
          this.clickMapEvent();
        }
      });
    },
    //地图点击
    clickMapEvent() {
      this.myChart.on("click", (params) => {
        // console.log("当前的params", params);
        if (!params.name) return;
        // this.$emit("mapClick", params);
        this.aMapJsonData.forEach((item) => {
          if (item.name == params.data.name) {
            if (item.isClick == false) {
              // 设置高亮 设置为选中区域数据
              item.isClick = true;
              item.itemStyle.normal.areaColor = "rgba(186, 234, 250, .7)";
              item.label = {
                color: "#fff",
                fontSize: 24,
                fontWeight: "bold",
                emphasis: {
                  color: "#fff",
                },
              };
              //这里开始派发左右数据
              this.getTownMapData(params.name);
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
                    color: "rgba(11, 54, 93, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(11, 54, 93, 0.4)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              };
              item.label = {
                color: "#ccc",
                fontSize: 18,
                fontWeight: "bold",
                emphasis: {
                  color: "#fff",
                },
              };
              // let parmas = {};
              // this.concurrency(parmas);
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
                  color: "rgba(11, 54, 93, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(11, 54, 93, 0.4)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            };
            item.label = {
              color: "#ccc",
              fontSize: 18,
              fontWeight: "bold",
              emphasis: {
                color: "#fff",
              },
            };
          }
        });
        this.myChart.setOption(this.oMapOptions, true);
      });
    },
    //拿到对应编码请求接口派发数据
    getTownMapData(e) {
      showMessage({
        content: e,
        type: "success",
        container: this.$refs.ShowMessageDiv,
        callback: function () {
          console.log("我是自定义全局弹窗");
        },
      })
    },
  }
}
</script>
