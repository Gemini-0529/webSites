<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import moment from "moment";
import { visitedHistory, addVisitTimes } from "@/api/siteList";
import { fromNow } from "@/utils/index.js";
const loading = ref(false);
const noMore = computed(() => list.data.length === list.total);
const disabled = computed(
  () => loading.value || list.total == 0 || list.total == list.data.length
);
const load = () => {
  if (disabled.value) return;
  loading.value = true;
  list.currentPage++;
  getHistory(times, false);
};
const list = reactive({
  data: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  noMore: false,
});
const historyRange = ref("month");
let times = [
  moment().subtract(1, "month").format("YYYY-MM-DD"),
  moment().format("YYYY-MM-DD HH:mm:ss"),
];

function changeRange(val) {
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
  switch (val) {
    case "month":
      times = [moment().subtract(1, "month").format("YYYY-MM-DD"), curTime];
      break;
    case "week":
      times = [moment().subtract(1, "week").format("YYYY-MM-DD"), curTime];
      break;
    case "today":
      times = [moment().format("YYYY-MM-DD"), curTime];
      break;
  }
  list.currentPage = 1
  getHistory(times, true);
}
onMounted(() => {
  getHistory(times, false);
});
async function getHistory(times, change) {
  const [startTime, endTime] = times;
  const { currentPage, pageSize } = list;

  const res = await visitedHistory({
    startTime,
    endTime,
    currentPage,
    pageSize,
  });
  if (res.status === 200 && res.data.length) {
    if (change) {
      list.data = res.data;
    } else {
      list.data.push(...res.data);
    }
    list.total = res.total;
    loading.value = false;
  } else {
    list.data = [];
    list.noMore = true;
    loading.value = false;
  }
}
async function clickHistory({id,visitTimes,link:url}) {
  await addVisitTimes({id,visitTimes})
  window.open(url)
}
</script>
<template>

  <el-radio-group v-model="historyRange" size="small" @change="changeRange">
    <el-radio-button label="month">上个月</el-radio-button>
    <el-radio-button label="week">上周</el-radio-button>
    <el-radio-button label="today">今日</el-radio-button>
  </el-radio-group>
  <div id="wrapper">
    <ul
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      style="overflow: auto"
    >
      <li><span>名称</span><span>链接</span><span>日期</span></li>
      <li v-for="(item, i) in list.data" :key="item.id" @click="clickHistory(item)" class="box">
        <span>{{ item.label }}</span
        ><span>{{ item.link }}</span
        ><span>{{ fromNow(new Date(item.lastVisitedTime)) }}</span>
      </li>
      <li v-if="loading">加载中...</li>
      <p v-if="noMore">没有更多了</p>
    </ul>
  </div>
</template>
