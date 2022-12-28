<script setup>
import {onMounted, ref} from 'vue'
import about from './views/AboutView.vue'
onMounted(()=> {
  window.document.documentElement.setAttribute( "data-theme", 'light' );
})
const dark = ref(false)
function change() {
  dark.value = !dark.value
  if(dark.value) {
    window.document.documentElement.setAttribute( "data-theme", 'dark' );
  }else {
    window.document.documentElement.setAttribute( "data-theme", 'light' );
  }
}
</script>

<template>
  <router-view></router-view>
  <!-- {{dark}}
  <button @click="change">切换</button> -->
</template>
<style lang="scss">

</style>
