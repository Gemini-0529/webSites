<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const breadItem = computed(() => {
  return router.currentRoute.value.meta.title;
});
</script>
<template>
  <div id="breadCrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadItem }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
