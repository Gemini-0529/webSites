<script setup>
import { useRouter } from 'vue-router'
import { useMenu } from "@/stores/menuList.js";
import { onMounted } from 'vue';
const menuStore = useMenu()
const router = useRouter()
const curMenu = menuStore.curMenuData?.value
onMounted(()=>{
  console.log(curMenu);
})
</script>
<template>
<div id="breadCrumb">
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>网站列表</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>