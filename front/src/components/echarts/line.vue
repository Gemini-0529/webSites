<script setup>
import {
  defineProps,
  onMounted,
  onUnmounted,
  defineEmits,
  watch,
  onBeforeUpdate,
  nextTick,
  ref,
} from "vue";
import * as echarts from "echarts";
const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  lineData: {
    type: Array,
    default: [], // {name, value}
    required: false,
  },
  chartId: String,
  isSmooth: {
    type: Boolean,
    default: true,
    required: false,
  },
});
var myChart = null,
  options = {};
function init() {
  myChart = echarts.init(document.getElementById(props.chartId));
  const nameList = props.lineData.map((item) => item.name);
  const valueList = props.lineData.map((item) => item.value);

  options = {
    title: {
      text: props.title,
      left: "center",
      textStyle: {
        fontSize: 14,
        width: 247,
        ellipsis: "...",
        overflow: "truncate",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      data: nameList,
    },
    yAxis: {
      type: "value",
    },
    grid: [
      {
        bottom: "10%",
      },
    ],
    visualMap: {
      // 控制台映射控件
      show: false,
      type: "continuous", // 渐变
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
    series: [
      {
        type: "line",
        data: valueList,
        smooth: props.isSmooth, // 平滑过度
      },
    ],
  };
// 自动轮播tooltip的起始索引
  var index = 0;
  var toolTimer = setInterval(() => {
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    index++;
    if (index > options.series[0].data.length) {
      index = 0;
    }
  }, 1500);
  myChart.on("mouseover", () => {
    clearInterval(toolTimer);
  });
  myChart.on("mouseout", () => {
    clearInterval(toolTimer);
    toolTimer = setInterval(() => {
      myChart?.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index > options.series[0].data.length) {
        index = 0;
      }
    }, 1500);
  });
  myChart.setOption(options);
}
const emits = defineEmits(["clickItem"]);
onMounted(() => {
  init();
  myChart.on("click", (params) => {
    emits("clickItem", params.data);
  });
  window.addEventListener("resize", resize);
});
onUnmounted(() => {
  myChart = null;
  window.removeEventListener("resize", resize);
});
function resize() {
  myChart.resize();
}
</script>
<template>
  <div :id="props.chartId"></div>
</template>
