<script setup>
import {
  defineProps,
  onMounted,
  onUnmounted,
  defineEmits,
  watch,
  onBeforeUpdate,
  nextTick,
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
  myid: String,
  isSmooth: {
    type: Boolean,
    default: true,
    required: false,
  },
});
watch(
  () => props.lineData,
  (n, o) => {
    // 解决渲染图表时，数据未获取到
    if (n.length) {
      init();
    }
  },
  { immediate: true }
);
var myChart = null,
  options = {};

function init() {
  console.log("dom节点", props.myid, document.getElementById(props.myid));
  myChart = echarts.init(document.getElementById(props.myid));
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
  myChart.setOption(options);
}
const emits = defineEmits(["clickItem"]);
onBeforeUpdate(() => {
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
  <div :id="props.myid"></div>
</template>
