<template>
<div class="common">
  <div class="common_table">
    <el-table :data="tableData">
      <el-table-column
        v-for="column in tableColumns"
        :prop="column.prop"
        :label="column.prop"
        :width="column.width"
      />
    </el-table>
  </div>
  <div class="common_pagination">
    <Pagination background :total="100"/>
  </div>
</div>
</template>

<script setup>
import { ref, defineProps } from "vue"
import Pagination from '../pagination.vue'
const props = defineProps({
  tableData: Array,
  tableColumns: {
    type: Array,
    required: true
  }
})

</script>
<style scoped lang="scss">
  .common {
    margin-top: 20px;
    overflow: hidden;
    &_table {
      width: 100%;
      height: 100%;
    }
    &_pagination {
      margin-top: 20px;
      float: right;
    }
  }
</style>
