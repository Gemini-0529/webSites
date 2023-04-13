<script setup>
import { reactive, ref } from "@vue/reactivity";
import { login } from "@/api/login.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"
import login_bg from "../../assets/images/bg_login.png";
const loginForm = reactive({
  uname: "",
  pwd: "",
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
function focus(type) {
  // 获取当前元素
  const el = document.getElementById(type);
  el.classList.add("focus");
  // 获取非当前元素
  const bro = type === "uname" ? "pwd" : "uname";
  const broEl = document.getElementById(bro);
  broEl.classList.remove("focus");
}
const router = useRouter();
async function submitLogin() {
  if (loginForm.uname === "" || loginForm.pwd === "") {
    return ElMessage.error("what");
  }
  const res = await login(loginForm);
  if (res?.token) {
    // 种cookie
    Cookies.set("token",res.token)
    localStorage.setItem('uid',res.uid)
    ElMessage.success("登录成功");
    setTimeout(() => {
      router.push("/welcome");
    }, 1000);
  } else {
    ElMessage.error(`登录失败，${res.msg}，请检查用户名或密码是否正确！`);
  }
}
</script>
<template>
  <div id="login">
    <div class="login_bg">
      <el-image :src="login_bg" fit="cover"></el-image>
    </div>
    <div class="login_form">
      <div class="title">用户登录</div>
      <div class="content">
        <div class="uname_wraper" id="uname">
          <input
            type="text"
            placeholder="用户名"
            autofocus
            @focus="focus('uname')"
            v-model.trim="loginForm.uname"
          />
          <el-icon
            class="clearable"
            v-if="loginForm.uname"
            @click="loginForm.uname = ''"
            ><Close
          /></el-icon>
        </div>
        <div class="pwd_wraper" id="pwd">
          <input
            type="password"
            placeholder="密码"
            @focus="focus('pwd')"
            v-model.trim="loginForm.pwd"
            ref="pwdInput"
            @keyup.enter.native="submitLogin"
          />
          <template v-if="loginForm.pwd">
            <el-icon @click="toogleShowPwd" class="eye">
              <View v-if="showPwd" />
              <Hide v-else />
            </el-icon>
          </template>
        </div>
      </div>
      <div class="submit" @click="submitLogin">登录</div>
      <div class="operation">
        <!-- <el-checkbox v-model="remember" label="记住密码"></el-checkbox> -->
        <span>忘记密码</span>
        <span>注册</span>
      </div>
    </div>
  </div>
</template>
