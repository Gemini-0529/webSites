<script setup>
import {onMounted} from 'vue'
import axios from 'axios'
function getUsers(){
  axios({
    url: '/API/home',
    method: 'get',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    dataType: 'json'
  }).then(res => {
    console.log('front,',res.data);
  }).catch(err => {
    console.log('err',err);
  })
}
</script>

<template>
  <button @click="getUsers">123发送请求</button>
</template>
