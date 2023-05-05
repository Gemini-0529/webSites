<template>
  <div id="notFound">
    <div class="text">
      <h3>Something's wrong here...</h3>
      <p>We can't find the page you're looking for.Check out our Help Center or head back to home.</p>
      <el-button round>Help</el-button>
      <el-button round @click="goHome">Home</el-button>
    </div>
    <img :src="imgUrl" alt="not found">
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const imgUrl = 'http://192.168.179.8:3000/images/404.png'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>
<style scoped lang="scss">
#notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  width:80%;
  margin: 0 auto;
  height:100vh;
  min-width: 1000px;
  color: #444;
  .text {
    width: 45%;
    h3 {
      font-size: 40px;
      font-weight: 400;
    }
    p {
      font-size: 24px;
      max-width: 700px;
      min-width: 400px;
      margin-top: 40px;
      margin-bottom: 60px;
    }
    padding: 20px;
  }
  img {
    max-width: 700px;
    flex: 1;
  }
}
</style>
