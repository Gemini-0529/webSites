<template>
  <el-upload
    action="/API/common/upload"
    list-type="picture-card"
    :on-success="uploadSuccess"
    :limit="1"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="dialogImageUrl" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script setup>
import { ref, defineProps, onMounted, nextTick, defineEmits } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  }
})
const dialogImageUrl = ref('')
nextTick(()=>{
  dialogImageUrl.value = props.imgUrl
})
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file) => {
  console.log(file)
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleDownload = (file) => {
  console.log(file)
}
const emits = defineEmits(['updateImgUrl'])
const uploadSuccess = (res, uploadFile, uploadFiles) => {
  dialogImageUrl.value = uploadFile.response.imgSrc
  emits('updateImgUrl', dialogImageUrl.value)
}
</script>
