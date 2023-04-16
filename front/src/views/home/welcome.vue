<script setup>
import Pie from "@components/echarts/pie.vue";
import Line from "@components/echarts/line.vue";
import Table from '@components/table/index.vue'
import { useMenu } from "@/stores/menuList.js";
import useTableColumns from '@/hooks/useTableColumns'
import {frequentlyVisited} from '@/api/siteList.js'
import { reactive, ref } from "vue";

const lineData = [
  { value: 30, name: "2000-06-05" },
  { value: 28, name: "rose 2" },
  { value: 26, name: "rose 3" },
  { value: 24, name: "rose 4" },
  { value: 22, name: "rose 5" },
  { value: 20, name: "rose 6" },
  { value: 100, name: "rose 7" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
  { value: 16, name: "rose 8" },
];
const clickItem = data => {
  console.log(data);
  window.open(data.link)
}

const menuStore = useMenu()
const tableColumns = useTableColumns('menusTable')
const pieData = reactive({
  data: []
})
async function frequentlyVisitedTimes() {
  const res = await frequentlyVisited()
  res.data.forEach(item => {
    pieData.data.push({
      name: item.label,
      value: item.visitTimes,
      link: item.link,
      visitTimes: item.visitTimes
    })
  })
  console.log('456789',pieData.data);
}
frequentlyVisitedTimes()

</script>
<template>
  <div>
    <Pie title="南丁格尔饼图南丁" roseType="area" :pieData="pieData.data" style="width:400px;height:400px;" showLegend @clickItem="clickItem" v-if="pieData.data.length" :formatterTooltip="[['名称：','name'],['地址：','link'],['访问次数：','visitTimes']]"/>
    <Line title="南丁格尔饼图南丁" :lineData="lineData" style="width:400px;height:400px;" @clickItem="clickItem"/>
    <!-- <Table :tableData="menuStore.menus" :tableColumns="tableColumns"/> -->
  </div>
</template>
