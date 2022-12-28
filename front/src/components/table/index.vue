<template>
<div class="common">
  <div class="common_table">
    <el-table :data="tableData">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
  <div class="common_pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :small="true"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</div>
</template>

<script setup>
import { ref } from "@vue/reactivity"

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const currentPage = ref(2)
const pageSize = ref(20)
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