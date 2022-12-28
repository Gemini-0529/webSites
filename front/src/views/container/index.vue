<template>
  <el-main id="container">
    <BreadCrumb/>
    <Table/>
    <router-view></router-view>
  </el-main>
</template>
<script setup>
import BreadCrumb from '@components/breadcrumb.vue'
import Table from '@components/table/index.vue'
</script>
