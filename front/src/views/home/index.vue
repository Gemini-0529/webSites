<template>
<div id="home">
  <router-view></router-view>
</div>
<!-- <div>home
</div> -->
    <!-- <el-container>
      <el-header>
        <div class="headers_container">
          <div class="headers_container_logo">
            <el-image style="width: 40px; height: 40px" :src="onlineUrl" fit="cover" />
          </div>
          <div class="headers_container_user">
            <el-dropdown>
              <span class="el-dropdown-link">
                切换主题<el-icon><CaretBottom /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Dark</el-dropdown-item>
                  <el-dropdown-item>Light</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown>
              <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
              <template #dropdown>
                <el-dropdown-menu>
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
        <Aside/>
        <Container/>
      </el-container>
    </el-container> -->
</template>

<script setup>
import Aside from '../aside/index.vue'
import Container from '../container/index.vue'
import imgUrl from '@/assets/images/logo.png'
const onlineUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
<style scoped lang="scss">
  .headers_container {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.1);
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
</style>
