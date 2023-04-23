<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import moment from "moment";
import { visitedHistory, addVisitTimes } from "@/api/siteList";
import { fromNow } from "@/utils/index.js";
import useShortCuts from "@/hooks/useShortCuts";

const loading = ref(false);
const noMore = computed(() => list.data.length === list.total);
const disabled = computed(
  () => loading.value || list.total == list.data.length || list.total == 0
);
const load = () => {
  if (disabled.value) return;
  loading.value = true;
  list.currentPage++;
  getHistory();
};
const list = reactive({
  data: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  noMore: false,
});
const timeRange = ref([
  moment().subtract(1, "month").format("YYYY-MM-DD"),
  moment().format("YYYY-MM-DD HH:mm:ss"),
]);
onMounted(() => {
  getHistory();
});
async function getHistory() {
  // 清空日期退出函数
  if(!timeRange.value) return;
  let [startTime, endTime] = timeRange.value.map((time) =>
    moment(time).format("YYYY-MM-DD HH:mm:ss")
  );
  // 今天的历史记录必须从0点开始查询，否则是空结果
  startTime = startTime.replace(/\d{2}:\d{2}:\d{2}/, "00:00:00");
  const { currentPage, pageSize } = list;
  const res = await visitedHistory({
    startTime,
    endTime,
    currentPage,
    pageSize,
  });
  if (res.status === 200 && res.data.length) {
    list.data.push(...res.data);
    list.total = res.total;
    loading.value = false;
  } else {
    list.data = [];
    list.total = 0;
    list.noMore = true;
    loading.value = false;
  }
}
</script>
<template>
  <el-date-picker
    v-model="timeRange"
    type="datetimerange"
    :shortcuts="useShortCuts()"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="getHistory"
  />
    <!-- style="margin-bottom: 10px" -->
  <el-timeline>
    <ul
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      style="overflow: auto;height:calc(100vh - 220px);padding-top: 10px"
    >
      <el-timeline-item
        v-for="(item, index) in list.data"
        :key="item.id"
        :timestamp="fromNow(new Date(item.lastVisitedTime))"
        placement="top"
        hollow
        color="rgb(0, 155, 147)"
      >
        <el-card shadow="hover">
          <el-image
            style="width: 50px; height: 50px"
            :src="item.icon"
          ></el-image>
          <div class="content">
            <h4>{{ item.label }}</h4>
            <el-link :underline="false" :href="item.link">{{
              item.link || "-"
            }}</el-link>
          </div>
        </el-card>
      </el-timeline-item>
    </ul>
  </el-timeline>
</template>
<style scoped lang="scss">
:deep(.el-card__body) {
  display: flex;
  align-items: center;
  .el-image {
    border-radius: 50%;
    margin-right: 10px;
  }
  .content {
    h4 {
      margin-bottom: 4px;
    }
  }
}
</style>
