<script setup>
import { reactive, defineProps, defineEmits, ref } from "vue";
import { addLeftMenu } from "@/api/menuList.js";
const props = defineProps({
  showDialog: {
    default: false,
    type: Boolean,
    required: true,
  },
});
let formData = reactive({
  data: {
    label: "",
    parentId: "",
    level: 1,
    uid: localStorage.getItem('uid') * 1
  },
});

const emits = defineEmits(["update:showDialog"]);
async function submit() {
  const params = formData.data;
  if (params.level == 1) {
    params.parentId = null;
  }
  const res = await addLeftMenu(params);
  emits('update:showDialog', false)
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
      <el-form-item label="名称" label-width="80px">
        <el-input v-model="formData.data.label" autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单级别" label-width="80px">
        <el-radio-group v-model="formData.data.level">
          <el-radio :label="1">一级</el-radio>
          <el-radio :label="2">二级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="父菜单"
        v-if="formData.data.level == 2"
        label-width="80px"
      >
        <el-select v-model="formData.data.parentId" placeholder="Please">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
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
