<template>
  <el-upload
    :action="`${base_url}/common/upload`"
    list-type="picture-card"
    :on-success="uploadSuccess"
    :show-file-list="false"
    :accept="accept.join(',')"
    :before-upload="beforeUpload"
    :headers="setHeaders"
    :auto-upload="false"
    :on-change="onChange"
    ref="upload"
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
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
const dialogImageUrl = ref("");
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
const upload = ref(null)
// 不自动上传只会触发change事件
const onChange = (uploadFile,uploadFiles) => {
  dialogImageUrl.value = uploadFile.url
}
const uploadImg = () => {
  upload.value.submit()
}
defineExpose({uploadImg})
const emits = defineEmits(["updateImgUrl"]);
const uploadSuccess = (res, uploadFile) => {
  dialogImageUrl.value = uploadFile.response.imgSrc;
  emits("updateImgUrl", dialogImageUrl.value);
};

const setHeaders = {
  token: Cookies.get('token')
}

const base_url = import.meta.env.VITE_APP_URL
</script>
