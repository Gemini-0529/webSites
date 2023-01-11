<script setup>
import { defineProps, onMounted, onUnmounted, defineEmits } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  pieData: {
    type: Array,
    default: [], // {name, value}
    required: false,
  },
  roseType: String | Boolean,
  showLegend: Boolean,
});
var myChart = null,
  options = {};
function init() {
  myChart = echarts.init(document.getElementById("pie"));
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
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    // 图例
    legend: {
      left: "center",
      bottom: "bottom",
      show: props.showLegend,
    },
    // 工具栏
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    series: [
      {
        name: "Area Mode", // legend name
        type: "pie",
        radius: [40, 120], // 饼图内外圆半径
        center: ["50%", "50%"],
        roseType: props.roseType, // 是否是南丁格尔展示类型 boolean | 'area'/'radius'
        itemStyle: {
          borderRadius: 4, // 内外圆角半径
        },
        data: props.pieData,
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
  window.removeEventListener('resize',resize)
});
function resize() {
  myChart.resize();
}
</script>
<template>
  <div id="pie"></div>
</template>
