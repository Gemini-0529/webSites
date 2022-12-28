<script setup>
import {
  defineProps,
  onMounted,
  defineEmits,
  onBeforeUnmount,
  ref,
  toRef,
} from "vue";
const props = defineProps({
  second: Object,
});
let start = toRef(props, "second");
// let start = ref(3)
let timer = null;
const emits = defineEmits(["finish"]);
onMounted(() => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (start.value > 0) {
      start.value--;
    } else {
      clearInterval(timer);
      emits("finish");
    }
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
<template>
  <span>{{ start }}</span>
</template>
