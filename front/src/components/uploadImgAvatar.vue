<template>
  <el-upload
    action="/API/common/upload"
    list-type="picture-card"
    :on-success="uploadSuccess"
    :show-file-list="false"
    :accept="accept.join(',')"
    :before-upload="beforeUpload"
    :headers="setHeaders"
  >
    <el-image
      v-if="dialogImageUrl"
      class="el-upload-list__item-thumbnail"
      :src="dialogImageUrl"
      alt=""
      key="custom"
    />
    <el-icon v-else><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const accept = ref(['image/jpeg','image/jpg','image/png','image/gif'])
const beforeUpload = (file) => {
  console.log(file);
  try {
    const {size, type} = file
    if(size / 1024 > 20) {
      ElMessage.error('图片不能超过 20 KB')
      return false
    }
    if(!accept.value.includes(type)) {
      ElMessage.error('仅支持上传 jpg，jpeg，png 格式')
      return false
    }
    return true
  }catch(err) {
    console.log('图片上传出错-->',err);
  }
}
const emits = defineEmits(["updateImgUrl"]);
const uploadSuccess = (res, uploadFile) => {
  dialogImageUrl.value = uploadFile.response.imgSrc;
  emits("updateImgUrl", dialogImageUrl.value);
};
// upload 组件 headers 丢失token
const setHeaders = {
  token: window.localStorage.getItem('token')
}
</script>
