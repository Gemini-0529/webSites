<script setup>
import { reactive, ref } from "@vue/reactivity";
import { login } from "@/api/login.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { register } from '@/api/register.js'
import login_bg from "../../assets/images/bg_login.png";
const registerForm = reactive({
  uname: "",
  pwd: "",
  rePwd: "",// 确认密码
  phone: ""
});
const remember = ref(true);
const showPwd = ref(false);
const pwdInput = ref(null);
function toogleShowPwd() {
  showPwd.value = !showPwd.value;
  if (showPwd.value) {
    console.log(pwdInput);
    pwdInput.value.type = "text";
  } else {
    pwdInput.value.type = "password";
  }
}
const inputTypes = ['uname', 'pwd', 'rePwd', 'phone'] // 定义输入框
function focus(type) {
  // 获取当前元素
  const el = document.getElementById(type);
  el.classList.add("focus");
  // 获取非当前元素
  inputTypes
    .filter(item => item != type)
    .forEach(el => {
      const broEl = document.getElementById(el);
      broEl.classList.remove("focus");
  })
}

const router = useRouter();
// 校验手机号
const showValidPhoneErr = ref(false)
// phone blur
function blur() {
  const regPhone = /^1[3,4,5,6,7,8,9]\d{9}$/g
  const el = document.getElementById('phone')
  console.log(registerForm.phone);
  if(!regPhone.test(registerForm.phone)){
    showValidPhoneErr.value = true
    el.classList.add('validErr')
    return false
  }else{
    el.classList.remove('validErr')
    showValidPhoneErr.value = false
    return true
  }
}
async function submitRegister() {
  const { uname, pwd, rePwd, phone} = registerForm
  if (uname === "" || pwd === "" || rePwd === "" || phone === "") {
    return ElMessage.error("what");
  }
  if(rePwd !== pwd) {
    return ElMessage.error("两次密码输入不一致")
  }
  if(showValidPhoneErr.value) {
    return
  }
  const res = await register(registerForm);
  if (res?.status === 200) {
    ElMessage.success("注册成功");
    setTimeout(() => {
      router.push("/welcome");
    }, 1000);
  } else {
    ElMessage.error(`注册失败，${res.msg}`);
  }
}
function goLogin() {
  router.push('/login')
}
</script>
<template>
  <div id="register">
    <div class="register_bg">
      <el-image :src="login_bg" fit="cover"></el-image>
    </div>
    <div class="login_form">
      <div class="title">注册新用户</div>
      <div class="content">
        <div class="uname_wraper" id="uname">
          <input
            type="text"
            placeholder="用户名"
            autofocus
            @focus="focus('uname')"
            v-model.trim="registerForm.uname"
          />
          <el-icon
            class="clearable"
            v-if="registerForm.uname"
            @click="registerForm.uname = ''"
            ><Close
          /></el-icon>
        </div>
        <div class="pwd_wraper" id="pwd">
          <input
            type="password"
            placeholder="密码"
            @focus="focus('pwd')"
            v-model.trim="registerForm.pwd"
            ref="pwdInput"
          />
          <template v-if="registerForm.pwd">
            <el-icon @click="toogleShowPwd" class="eye">
              <View v-if="showPwd" />
              <Hide v-else />
            </el-icon>
          </template>
        </div>
        <div class="pwd_wraper" id="rePwd">
          <input
            type="password"
            placeholder="确认密码"
            @focus="focus('rePwd')"
            v-model.trim="registerForm.rePwd"
            ref="rePwdInput"
          />
        </div>
        <div class="pwd_wraper" id="phone">
          <input
            type="number"
            placeholder="手机号"
            @focus="focus('phone')"
            @blur="blur"
            v-model.trim="registerForm.phone"
            ref="phone"
          />
        </div>
        <div class="validPhone" v-if="showValidPhoneErr">手机号格式有误</div>
      </div>
      <div class="submit" @click="submitRegister">注册</div>
      <div class="operation">
        <!-- <el-checkbox v-model="remember" label="记住密码"></el-checkbox> -->
        <span @click="goLogin" class="goLogin">返回登录</span>
      </div>
    </div>
  </div>
</template>
