<style lang="scss" scoped>
@import "../index.scss";
$font-family: PingFangSC-Medium, PingFang SC;
$text-shadow-color: rgba(255, 247, 247, 0.5);
$background-start: rgba(36, 197, 219, 0.25);
$background-end: rgba(16, 147, 180, 0.29);
$border-image-start: rgba(130, 235, 255, 1);
$border-image-middle: rgba(88, 234, 255, 0.19);
$border-image-end: rgba(121, 231, 255, 1);
$border-radius: 8px;
$box-padding: 10px;
$transition-duration: 1s;

%cybox-shared {
  position: absolute;
  min-height: 37px;
  padding: $box-padding;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-family: $font-family;
  font-weight: 500;
  color: #ffffff;
  line-height: 37px;
  text-shadow: 0px 0px 4px $text-shadow-color;
  background: linear-gradient(180deg, $background-start 0%,
      $background-end 100%);
  border: 2px solid;
  border-radius: $border-radius;
  border-image: linear-gradient(180deg,
      $border-image-start,
      $border-image-middle,
      $border-image-end) 1 1;
  clip-path: inset(0 round $border-radius);
  backdrop-filter: blur(2px);
  transition: all $transition-duration;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
}

$width: (
  width-0: 140px,
  width-1: 140px,
  width-2: 184px,
  width-3: 140px,
  width-4: 140px,
  width-5: 140px
);
$widthAni: (
  width-0: 180px,
  width-1: 180px,
  width-2: 224px,
  width-3: 180px,
  width-4: 180px,
  width-5: 180px
);
$left: (
  left-0: 146px,
  left-1: 26px,
  left-2: 50%,
  left-3: auto,
  left-4: 172px,
  left-5: auto
);
$transform: (
  transform-0: translate(0%, 0%),
  transform-1: translate(0%, 0%),
  transform-2: translate(-50%, 0%),
  transform-3: translate(0%, 0%),
  transform-4: translate(0%, 0%),
  transform-5: translate(0%, 0%)
);
$right: (
  right-0: auto,
  right-1: auto,
  right-2: auto,
  right-3: 56px,
  right-4: auto,
  right-5: 92px
);
$top: (
  top-0: auto,
  top-1: auto,
  top-2: auto,
  top-3: auto,
  top-4: 29px,
  top-5: 29px
);
$bottom: (
  bottom-0: 10px,
  bottom-1: 39px,
  bottom-2: 39px,
  bottom-3: 39px,
  bottom-4: auto,
  bottom-5: auto
);
$font-size: (
  font-size-0: 16px,
  font-size-1: 16px,
  font-size-2: 26px,
  font-size-3: 16px,
  font-size-4: 16px,
  font-size-5: 16px
);
$font-sizeAni: (
  font-size-0: 20px,
  font-size-1: 20px,
  font-size-2: 30px,
  font-size-3: 20px,
  font-size-4: 20px,
  font-size-5: 20px
);
$opacity: (
  opacity-0: 1,
  opacity-1: 1,
  opacity-2: 1,
  opacity-3: 1,
  opacity-4: 0.67,
  opacity-5: 0.67
);

.echarts-main__flex__child {
  position: relative;

  @for $i from 0 through 5 {
    .echarts-main__flex__child__word-clloud#{$i} {
      @extend %cybox-shared;
      width: map-get($width, width-#{$i});
      left: map-get($left, left-#{$i});
      right:map-get($right, right-#{$i});
      top:map-get($top, top-#{$i});
      bottom:map-get($bottom, bottom-#{$i});
      transform: map-get($transform, transform-#{$i});
      font-size:map-get($font-size, font-size-#{$i});
      opacity:map-get($opacity, opacity-#{$i});
    }

    .echarts-main__flex__child__word-clloud-ani#{$i} {
      width: map-get($widthAni, width-#{$i}) !important;
      font-size:map-get($font-sizeAni, font-size-#{$i}) !important;
      padding: 30px 30px 30px 30px !important;
      color: #fff !important;
      opacity: 1 !important;
      z-index: 99 !important;
    }
  }
}

.echarts-main__flex__bottom-img {
  width: 90%;
  height: 193px;
  position: absolute;
  bottom: 16%;
  left: 10%;
  background: url("~@/assets/images/qjzspagebgBottomBg.png") no-repeat no-repeat;
  background-size: 100% 100%;
  mix-blend-mode: screen;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    right: 0;
    width: 16%;
    height: 193px;
    background-color: black;
    z-index: 2;
  }
}
</style>
<template>
  <div class="echarts-main flex-column-center">
    <div class="echarts-main__flex flex-column-center">
      <div class="echarts-main__flex__child">
        <div v-for="(item, index) in aWordCloudData" :key="index"
          :class="['echarts-main__flex__child__word-clloud' + index, nWordCloundIndex == index ? 'echarts-main__flex__child__word-clloud-ani' + nWordCloundIndex : '']">
          {{ item?.name ? item?.name : "暂无" }}
        </div>
      </div>
      <div class="echarts-main__flex__bottom-img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "echartsWordCloud",
  data() {
    return {
      //词云数据
      aWordCloudData: [
        { name: "测试数据" },
        { name: "测试数据2" },
        { name: "测试数据3" },
        { name: "测试数据4" },
        { name: "测试数据5" },
        { name: "测试数据6" },
      ],
      //词云当前展示索引
      nWordCloundIndex: 0,
      //词云定时器
      oWordCloundTime: null,
    }
  },
  beforeCreate() {

  },
  created() {

  },
  beforeDestroy() {
    clearInterval(this.oWordCloundTime);
  },
  watch: {
  },
  mounted() {
    //动画轮询
    this.setWordCloundIndex();
  },
  methods: {
    //动画轮询改变词云索引
    setWordCloundIndex() {
      clearInterval(this.oWordCloundTime);
      this.oWordCloundTime = setInterval(() => {
        if (this.nWordCloundIndex >= 5) this.nWordCloundIndex = -1;
        this.nWordCloundIndex++;
      }, 2000);
    },
  }
}
</script>