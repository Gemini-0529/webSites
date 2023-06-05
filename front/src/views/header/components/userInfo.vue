<script setup>
import { getUserInfo, updateUser } from "@/api/user.js";
import { onMounted, reactive, ref } from "vue";
import UploadImg from "@/components/uploadImgAvatar.vue";
import { ElMessage} from 'element-plus'
const user = reactive({
  data: {},
});
async function userInfo() {
  const uid = localStorage.getItem('uid')

  const res = await getUserInfo({ uid });
  if (res.status === 200) {
    user.data = res.data[0];
    // user.data.pwd = user.data.pwd.replace(/\w+/,'●●●●●●')
  }
}
userInfo();

function imageError(err) {
  console.log('errrrrr',err);
  // ElMessage.warning("666",err)
}
const isEdit = ref(false)
function update() {
  isEdit.value = true
}
function imgUrl(url) {
  user.data.icon = url
}
const uploadImg = ref(null)
async function submit() {
  await uploadImg.value.uploadImg()
  await updateUser(user.data)
}
</script>
<template>
  <div>
    <h3 style="margin-bottom:10px">基本信息：</h3>
    <el-form ref="form" :model="user.data" label-width="120px" style="width:500px">
      <el-form-item label="用户名：">
        <el-input v-model="user.data.uname" placeholder="请输入用户名" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="user.data.phone" placeholder="请输入手机号" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item label="ID：">
        <el-input v-model="user.data.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="user.data.pwd" placeholder="请输入手机号" :disabled="!isEdit" type="password"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：">
        <el-input v-model="user.data.createTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户头像：">
        <el-image
          style="width: 100px; height: 100px"
          :src="user.data.icon"
          @error="imageError"
          v-if="user.data.icon && !isEdit"
        ></el-image>
        <UploadImg @updateImgUrl="imgUrl" v-else ref="uploadImg"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update">修改</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <LuckySheet/> -->
</template>
