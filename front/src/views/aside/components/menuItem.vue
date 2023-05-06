<script setup>
import { defineProps } from "vue";
import SubMenu from "./menuItem.vue";
defineProps({
  menuList: {
    default: [],
    type: Array,
  },
});
// console.log('child',menuList);
</script>
<template>
  <div>
    <template v-for="item in menuList">
      <el-sub-menu v-if="item.subMenu?.length" :index="`${item.id}`" :key="item.id">
        <template #title>
          <span>
            <!-- <el-icon v-if="item.icon"><InfoFilled /></el-icon> -->
            {{ item.label }}
          </span>
        </template>
        <SubMenu :menuList="item.subMenu" />
      </el-sub-menu>

      <el-menu-item :index="`${item.id}`" :key="item.id" v-else>
        <!-- <el-icon v-if="item.icon"><InfoFilled /></el-icon> -->
        {{ item.label }}
      </el-menu-item>
    </template>
  </div>
</template>
