<script setup>
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps({
  currentPage: Number,
  pageSize: Number,
  pageSizes: {
    type: Array,
    default: [10, 20, 50, 100],
  },
  small: Boolean,
  disabled: Boolean,
  background: Boolean,
  layout: {
    type: String,
    default: ()=>"total, sizes, prev, pager, next",
  },
  total: Number,
});
const emits = defineEmits(["sizeChange", "currentChange"]);
function handleSizeChange(val) {
  emits("sizeChange", val);
}
function handleCurrentChange(val) {
  emits("currentChange", val);
}
</script>
<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="pageSizes"
    :small="small"
    :disabled="disabled"
    :background="background"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<style lang="scss" scoped>
.el-pagination {
  float: right;
}
</style>