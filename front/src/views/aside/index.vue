<script setup>
// import { menuList } from '@/api/menuList.js'
import { reactive, onBeforeMount, onMounted } from "vue";
import { useMenu } from "@/stores/menuList.js";
import MenuItem from "./menuItem.vue";
import { useRouter } from "vue-router";
import addMenuDialog from './addMenuDialog.vue'

// 获取菜单数据
const menuStore = useMenu();
menuStore.getMenuList();

const router = useRouter();
// 点击菜单回调
/**
 * index: 菜单的index
 * indexPath：菜单完整路径
 * item：[index, indexPath]
 */
function selectMenu(index, indexPath, item) {
  console.log("点击菜单的回调", index, indexPath, item);
  router.push({
    name: "Sites",
    params: { id: index },
  });
}
const showDialog = ref(false)
const addMenu = function() {
  showDialog.value = true
}
</script>
<template>
  <el-aside width="200px">
    <template v-if="menuStore.menuTree.length">
      <el-menu
        :default-active="menuStore.curMenuId+''"
        class="el-menu-vertical-demo"
        active-text-color="#fff"
        unique-opened
        @select="selectMenu"
      >
          <MenuItem :menuList="menuStore.menuTree" />
      </el-menu>
      <el-button type="primary">添加</el-button>
      <el-button type="primary" plain>添加</el-button>
    </template>
    <div v-else>暂无数据</div>
  </el-aside>
  <addMenuDialog v-model:showDialog="showDialog"/>
</template>
