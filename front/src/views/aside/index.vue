<script setup>
// import { menuList } from '@/api/menuList.js'
import { reactive, onMounted, ref } from "vue";
import { useMenu } from "@/stores/menuList.js";
import MenuItem from "./components/menuItem.vue";
import { useRouter } from "vue-router";

import AddMenuDialog from './components/addMenuDialog.vue'
import DelMenuDialog from './components/delMenuDialog.vue'
import OperationBtn from './components/operationBtn.vue'


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


const showAddDialog = ref(false)
const addMenu = function() {
  showAddDialog.value = true
}
const showDelDialog = ref(false)
const delMenu = function() {
  showDelDialog.value = true
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
    </template>
    <div v-else>暂无数据</div>
  </el-aside>
  <AddMenuDialog v-model:showDialog="showAddDialog" v-if="showAddDialog"/>
  <DelMenuDialog v-model:showDialog="showDelDialog" v-if="showDelDialog"/>
  <OperationBtn @add="addMenu" @del="delMenu"/>
</template>
