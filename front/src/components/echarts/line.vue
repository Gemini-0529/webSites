<script setup>
import { defineProps, onMounted, onUnmounted, defineEmits } from "vue";
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
});
var myChart = null,
  options = {};

function init() {
  myChart = echarts.init(document.getElementById("line"));
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
      },
    ],
  };
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
  <div id="line"></div>
</template>
