<script setup>
import { reactive, defineProps, defineEmits, ref, watch } from "vue";
import { addLeftMenu, parentMenu } from "@/api/menuList.js";
import { ElMessage } from "element-plus";
import { useMenu } from "@/stores/menuList.js";
const props = defineProps({
  showDialog: {
    default: false,
    type: Boolean,
    required: true,
  },
});
const uid = localStorage.getItem("uid") * 1;
// 获取一级菜单
const parentMenus = reactive({
  data: [],
});
async function getParentMenu() {
  const res = await parentMenu({ uid });
  if (res.status === 200 && res.data.length) {
    parentMenus.data = res.data;
  } else {
    ElMessage.error("获取父级菜单列表失败");
  }
}

let formData = reactive({
  data: {
    label: "",
    parentId: "",
    level: 1,
    uid,
  },
});
watch(
  () => formData.data.level,
  (nval, oval) => {
    // 选择二级菜单，获取当前用户创建的一级菜单
    if (nval == 2) {
      getParentMenu();
    }
  }
);
const emits = defineEmits(["update:showDialog"]);
const menuStore = useMenu();
async function submit() {
  const params = formData.data;
  if (params.level == 1) {
    params.parentId = null;
  }
  const res = await addLeftMenu(params);
  if (res.status === 200) {
    ElMessage.success(`新增 ${params.label} 菜单成功`);
    await menuStore.getMenuList();
  }
  emits("update:showDialog", false);
}
const form = ref(null);
function close() {
  emits("update:showDialog", false);
  form.value.resetFields();
}
</script>
<template>
  <el-dialog
    v-model="showDialog"
    title="新增菜单"
    width="600px"
    append-to-body
    @close="close"
    v-if="showDialog"
  >
    <el-form :model="formData" ref="form" label-position="right">
      <el-form-item label="名称：" label-width="100px">
        <el-input v-model="formData.data.label" autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单级别：" label-width="100px">
        <el-radio-group v-model="formData.data.level">
          <el-radio :label="1">一级</el-radio>
          <el-radio :label="2">二级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="父级菜单："
        v-if="formData.data.level == 2"
        label-width="100px"
      >
        <el-select v-model="formData.data.parentId" placeholder="请选择父级菜单">
          <el-option
            :label="item.label"
            :value="item.id"
            :key="item.id"
            v-for="item in parentMenus.data"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
