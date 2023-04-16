<script setup>
import Aside from "../aside/index.vue";
import Container from "../container/index.vue";
import BreadCrumb from "@components/breadcrumb.vue";
import imgUrl from "@/assets/images/logo.png";
import { reactive } from "@vue/reactivity";
import { onMounted, ref } from "vue";
const onlineUrl =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
import History from "./history.vue";
const themes = reactive([
  {
    index: "dark",
    title: "深色系",
  },
  {
    index: "light",
    title: "浅色系",
  },
]);
const curTheme = ref("");
// 切换主题
onMounted(() => {
  curTheme.value = localStorage.getItem("theme");
  if (curTheme.value) {
    window.document.documentElement.setAttribute("data-theme", curTheme.value);
  } else {
    window.document.documentElement.setAttribute("data-theme", "light");
  }
});
function handleCommand(theme) {
  localStorage.setItem("theme", theme);
  curTheme.value = theme;
  window.document.documentElement.setAttribute("data-theme", theme);
}
</script>
<template>
  <el-container>
    <el-header>
      <div class="headers_container">
        <div class="headers_container_logo">
          <el-image
            style="width: 40px; height: 40px"
            :src="onlineUrl"
            fit="cover"
          />
        </div>
        <div class="headers_container_user">
          <el-dropdown popper-class="themes_popper" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ curTheme == "dark" ? "深色系" : "浅色系"
              }}<el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in themes"
                  :key="item.index"
                  :command="item.index"
                  :class="[
                    'theme_item',
                    item.index === curTheme ? 'active' : '',
                  ]"
                >
                  {{ item.title }}
                </el-dropdown-item>
                <!-- <el-dropdown-item>Light</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <!-- 用户信息 -->
                <el-dropdown-item disabled class="user_item">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <span class="userInfo">用户名</span>
                </el-dropdown-item>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container class="main">
      <Aside />
      <!-- <Container/> -->
      <el-main class="pageContainer">
        <BreadCrumb />
        <router-view></router-view>
      </el-main>
      <div style="width: 350px; margin-top: 20px">
        <History />
      </div>
    </el-container>
  </el-container>
</template>
<style scoped lang="scss">
@import "@/assets/themes/common/index.scss";
.el-header {
  padding: 0;
}
.headers_container {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  @include border_color("text_minor_color");
  @include bg_content("bg_content");
  // &_logo {
  //   width: ;
  // }
  &_user {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dropdown:first-child {
      margin-right: 10px;
    }
  }
}
.main {
  height: calc(100vh - 80px);
}
:deep(.user_item) {
  cursor: default;
  .userInfo {
    margin-left: 10px;
    .main {
      height: calc(100vh - 60px);
    }
  }
}
</style>
