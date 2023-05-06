<template>
  <div id="fixed-widgets">
    <span class="avatar">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" class="icon">
        <g fillRule="evenodd">
          <g fillRule="nonzero">
            <path
              d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"
            ></path>
          </g>
        </g>
      </svg>
      <div class="operations">
        <div class="add" @click="add"><el-icon><Plus /></el-icon></div>
        <div class="del" @click="del"><el-icon><Minus /></el-icon></div>
      </div>
    </span>
  </div>
</template>
<script setup>
import svgurl from "@/assets/images/魔术棒.svg";
import { defineEmits } from 'vue'
const emits = defineEmits(['add', 'del'])
function add() {
  emits('add')
}
function del() {
  emits('del')
}
</script>

<style scoped lang="scss">
#fixed-widgets {
  position: fixed;
  left: 22px;
  bottom: 175px;
  .avatar {
    width: 44px;
    height: 44px;
    display: inline-block;
    line-height: 44px;
    border-radius: 50%;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    transition: color .3s ease-in-out;
    &:hover {
      color: #009B93;
      .operations {
        display: block;
      }
    }
  }
  .operations {
    width: 100px;
    height: 100px;
    left: 0;
    bottom: 0;
    position: absolute;
    display: none;
    box-sizing: border-box;
    .add,
    .del {
      width: 50px;
      height: 50px;
      line-height: 56px;
      text-align: center;
      font-size: 26px;
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000009;
      position: absolute;
      .el-icon {
        animation: rotate .3s ease-in-out;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .add {
      left: 16px;
      bottom: 50px;
    }
    .del {
      left: 52px;
      bottom: 4px;
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(180deg)
  }
}
</style>
