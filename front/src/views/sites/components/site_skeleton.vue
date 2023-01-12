<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  loading: Boolean,
});
</script>

<template>
  <el-skeleton id="skeleton" animated :throttle="500" :loading="props.loading">
    <template #template>
      <el-skeleton-item variant="circle" style="width: 100px; height: 100px" />
      <div class="item">
        <el-skeleton-item />
        <el-skeleton-item />
        <el-skeleton-item />
      </div>
    </template>
  </el-skeleton>
</template>
<style scoped lang="scss">
#skeleton {
  width: 310px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .item {
    flex: 1;
    margin-left: 10px;
    .el-skeleton__item:last-child {
      width: 40%;
    }
  }
}
</style>
