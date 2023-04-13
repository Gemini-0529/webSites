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
  formatterTooltip: Array, // [[label, value]]
  roseType: String | Boolean,
  showLegend: Boolean,
  charId: String,
});
var myChart = null,
  options = {};
const emits = defineEmits(["clickItem", "formatTooltip"]);
function init() {
  myChart = echarts.init(document.getElementById(props.charId));
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
      formatter: (params) => {
        let text = "";
        props.formatterTooltip.forEach((item) => {
          text += `${item[0]}${params.data[item[1]]}</br>`;
        });
        return text;
      },
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
        name: "", // legend name
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
  <div :id="props.charId"></div>
</template>
