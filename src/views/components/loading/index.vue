<style lang="scss" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  .ani0 {
    width: 11.2px;
    height: 11.2px;
    border-radius: 11.2px;
    box-shadow: 28px 0px 0 0 rgba(255, 255, 255, 0.2),
      22.7px 16.5px 0 0 rgba(255, 255, 255, 0.4),
      8.68px 26.6px 0 0 rgba(255, 255, 255, 0.6),
      -8.68px 26.6px 0 0 rgba(255, 255, 255, 0.8),
      -22.7px 16.5px 0 0 #ffffff;
    animation: spinner-b87k6z 1s infinite linear;

    @keyframes spinner-b87k6z {
      to {
        transform: rotate(360deg);
      }
    }
  }

  .ani1 {
    width: 33.6px;
    height: 67.2px;
    animation: progress-sze6ck 2s infinite backwards;
    background: linear-gradient(0deg, #ffffff, #ffffff 50%, transparent 50%, transparent);
    background-size: 100% 200%;
    background-repeat: no-repeat;
    border: 6.7px solid #dbdcef;
    border-radius: 16.8px;

    @keyframes progress-sze6ck {
      0% {
        background-position: 0 0;
        transform: rotate(0deg);
      }

      25% {
        background-position: 0 100%;
        transform: rotate(0deg);
      }

      50% {
        background-position: 0 100%;
        transform: rotate(180deg);
      }

      75% {
        background-position: 0 200%;
        transform: rotate(180deg);
      }

      100% {
        background-position: 0 200%;
        transform: rotate(360deg);
      }
    }
  }

  .ani2 {
    width: 56px;
    height: 31.4px;
    background: radial-gradient(farthest-side, #ffffff 90%, #0000) 50% 0,
      radial-gradient(farthest-side, #ffffff 90%, #0000) 100% 0;
    background-size: 13.4px 13.4px;
    background-repeat: no-repeat;
    position: relative;
    animation: dots-pr30iymd 1.5s linear infinite;

    &::before {
      content: "";
      position: absolute;
      width: 13.4px;
      height: 13.4px;
      border-radius: 50%;
      background: #ffffff;
      left: 0;
      top: 0;
      animation: dots-q6bpf4md 1.5s linear infinite,
        dots-b39z9imd 0.5s cubic-bezier(0, 200, .8, 200) infinite;
    }

    @keyframes dots-pr30iymd {

      0%,
      31% {
        background-position: 50% 0, 100% 0;
      }

      33% {
        background-position: 50% 100%, 100% 0;
      }

      43%,
      64% {
        background-position: 50% 0, 100% 0;
      }

      66% {
        background-position: 50% 0, 100% 100%;
      }

      79% {
        background-position: 50% 0, 100% 0;
      }

      100% {
        transform: translateX(calc(-100%/3));
      }
    }

    @keyframes dots-q6bpf4md {
      100% {
        left: calc(100% + 7.8px);
      }
    }

    @keyframes dots-b39z9imd {
      100% {
        top: -0.17px;
      }
    }
  }

  .ani3 {
    width: 50.5px;
    height: 50.5px;
    --c: repeating-linear-gradient(90deg, #ffffff 0 10.1px, #0000 0 20.2px);
    background: var(--c),
      var(--c),
      var(--c),
      var(--c);
    background-size: 100% 26%;
    background-repeat: no-repeat;
    animation: bars-o4373fmd 1.5s infinite;

    @keyframes bars-o4373fmd {
      0% {
        background-position: -56px 0%, -56px 33.33%, -56px 66.66%, -56px 100%;
      }

      12.5% {
        background-position: 0 0%, -56px 33.33%, -56px 66.66%, -56px 100%;
      }

      25% {
        background-position: 0 0%, 0 33.33%, -56px 66.66%, -56px 100%;
      }

      37.5% {
        background-position: 0 0%, 0 33.33%, 0 66.66%, -56px 100%;
      }

      45%,
      55% {
        background-position: 0 0%, 0 33.33%, 0 66.66%, 0 100%;
      }

      62.5% {
        background-position: 56px 0%, 0 33.33%, 0 66.66%, 0 100%;
      }

      75% {
        background-position: 56px 0%, 56px 33.33%, 0 66.66%, 0 100%;
      }

      87.5% {
        background-position: 56px 0%, 56px 33.33%, 56px 66.66%, 0 100%;
      }

      100% {
        background-position: 56px 0%, 56px 33.33%, 56px 66.66%, 56px 100%;
      }
    }
  }

  .ani4 {
    width: 44.8px;
    height: 44.8px;
    color: #ffffff;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #0000, currentColor 1deg 120deg, #0000 121deg) top right,
        conic-gradient(from 120deg, #0000, currentColor 1deg 120deg, #0000 121deg) bottom,
        conic-gradient(from 240deg, #0000, currentColor 1deg 120deg, #0000 121deg) top left;
      background-size: 44.8px 44.8px;
      background-repeat: no-repeat;
      animation: shapes-r0t0iomd 2s infinite cubic-bezier(0.3, 1, 0, 1);
    }

    @keyframes shapes-r0t0iomd {
      33% {
        inset: -9px;
        transform: rotate(0deg);
      }

      66% {
        inset: -9px;
        transform: rotate(180deg);
      }

      100% {
        inset: 0;
        transform: rotate(180deg);
      }
    }
  }

  .ani5 {
    width: 56px;
    height: 56px;
    display: flex;
    color: #ffffff;
    background: linear-gradient(currentColor 0 0) right /51% 100%,
      linear-gradient(currentColor 0 0) bottom /100% 51%;
    background-repeat: no-repeat;
    animation: flipping-6lzl45md 2s infinite linear 0.25s;

    &::before {
      content: "";
      width: 50%;
      height: 50%;
      background: currentColor;
      transform-origin: 10% 10%;
      animation: flipping-f8e50xmd 0.5s infinite linear;
    }

    @keyframes flipping-6lzl45md {

      0%,
      12.49% {
        transform: rotate(0deg);
      }

      12.5%,
      37.49% {
        transform: rotate(90deg);
      }

      37.5%,
      62.49% {
        transform: rotate(180deg);
      }

      62.5%,
      87.49% {
        transform: rotate(270deg);
      }

      87.5%,
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes flipping-f8e50xmd {
      0% {
        transform: perspective(89.6px) rotate3d(-1, 1, 0, 0);
      }

      80%,
      100% {
        transform: perspective(89.6px) rotate3d(-1, 1, 0, -360deg);
      }
    }
  }

  .ani6 {
    width: 22.4px;
    height: 22.4px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
    animation: pulse-kefe91md 1.5s infinite linear;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
      animation: inherit;
      animation-delay: -0.5s;
    }

    &::after {
      animation-delay: -1s;
    }

    @keyframes pulse-kefe91md {
      100% {
        box-shadow: 0 0 0 44.8px #0000;
      }
    }
  }

  .ani7 {
    width: 67.2px;
    height: 28px;
    border: 2.2px solid #ffffff;
    border-radius: 50%;
    display: grid;
    animation: hypnotic-ds34hk 2s infinite linear;

    &::before,
    &::after {
      content: "";
      grid-area: 1/1;
      border: inherit;
      border-radius: 50%;
      animation: inherit;
      animation-duration: 3s;
    }

    &::after {
      --s: -1;
    }

    @keyframes hypnotic-ds34hk {
      100% {
        transform: rotate(calc(var(--s, 1)*1turn));
      }
    }
  }
}
</style>
<template>
  <div class="loading">
    <div :class="sAniName"></div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
    }
  },
  beforeCreate() {

  },
  created() {
  },
  computed: {
    sAniName() {
      let num = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
      // console.log('当前数',num)
      return 'ani' + num
    }
  },
  watch: {
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
    },
  }
}
</script>