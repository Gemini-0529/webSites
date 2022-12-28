<script setup>
import { reactive, ref, defineEmits, watch, nextTick, computed } from "vue";
import { useMenu } from "@/stores/menuList.js";
import { spliderIcon, updateSite } from "@/api/siteList.js";
import UploadImg from "@/components/uploadImgAvatar.vue";
import { addSite } from "@/api/siteList.js";
import useRuleForm from "@/hooks/useRuleForm";
import { ElMessage } from "element-plus";

const rules = useRuleForm("typeId", "label", "description", "link", "icon");
const props = defineProps({
  showDialog: {
    type: Boolean,
    required: true,
  },
  siteDetail: {
    type: Object,
    default: {},
  },
});
const menuStore = useMenu();

let formData = reactive({
  data: {
    typeId: "",
    label: "",
    description: "",
    link: "",
    icon: "http://localhost:3000/images/default.png",
    isCollect: 0,
  },
});
const extFormData = reactive({
  iconType: "default", // 提交表单时删除
  icon: "",
});
watch(
  () => props.showDialog,
  (n, o) => {
    if (n) {
      formData.data.typeId = menuStore.curMenuData.id;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.siteDetail,
  (n, o) => {
    console.log("传递详情", n, o);
    if (JSON.stringify(n) != "{}") {
      formData.data = n;
    } else {
      formData.data = {
        typeId: menuStore.curMenuData.id,
        label: "",
        description: "",
        link: "",
        icon: "http://localhost:3000/images/default.png",
        isCollect: 0,
      };
    }
  }
);

const emits = defineEmits([
  "update:showDialog",
  "operaSuccess",
  "update:isAdd",
]);
const form = ref(null);
// 关闭弹窗
function close() {
  emits("update:showDialog", false);
  // emits('update:isAdd', false)
  form.value.resetFields();
}
const isAdd = computed(() => {
  return !props.siteDetail.label;
});
async function add() {
  formData.data.typeId = menuStore.curMenuData.id;
  if (extFormData.icon != "") {
    formData.data.icon = extFormData.icon;
  }
  const valid = await form.value.validate();
  if (valid) {
    const res = isAdd.value
      ? await addSite(formData.data)
      : await updateSite(
          Object.assign(formData.data, { id: props.siteDetail.id })
        );
    if (res.status === 200) {
      ElMessage.success(`${isAdd.value ? "新增" : "修改"}成功`);
      emits("operaSuccess");
    } else {
      ElMessage.error(res.msg);
    }
    close();
  }
}

async function getICO(e) {
  if(extFormData.iconType === 'default') {
    const res = await spliderIcon({ url: e.target.value });
    formData.data.icon = res.href;
    formData.data.description = res.description;
  }
}
let iconUrl = ref("");
iconUrl.value = formData.data.icon;
function imageError() {
  const [protocol, empty, domain] = formData.data.link.split("/");
  formData.data.icon = iconUrl.value =
    protocol + "//" + domain + formData.data.icon;
}
function newUrl(val) {
  extFormData.icon = val;
}
</script>
<template>
  <el-dialog
    v-model="showDialog"
    :title="`${isAdd ? '新增' : '修改'}`"
    width="600px"
    append-to-body
    @close="close"
    v-if="showDialog"
  >
    <el-form :model="formData.data" ref="form" :rules="rules">
      <el-form-item label="分类：" prop="typeId">
        <el-select v-model="formData.data.typeId" disabled>
          <el-option
            :label="menuStore.curMenuData.label"
            :value="menuStore.curMenuData.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称：" prop="label">
        <el-input
          v-model="formData.data.label"
          clearable
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="链接：" prop="link">
        <el-input v-model="formData.data.link" clearable @blur="getICO" />
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          v-model="formData.data.description"
          clearable
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入描述信息"
          maxlength="80"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="图标：">
        <el-radio-group v-model="extFormData.iconType" class="ml-4">
          <el-radio label="default">默认</el-radio>
          <el-radio label="custom">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="empty" class="emptyLabel" prop="icon">
        <el-image
          style="width: 100px; height: 100px"
          :src="formData.data.icon"
          @error="imageError"
          v-if="extFormData.iconType == 'default'"
        />
        <UploadImg @updateImgUrl="newUrl" v-else />
      </el-form-item>
      <el-form-item label="收藏：" prop="isCollect">
        <el-switch
          v-model="formData.data.isCollect"
          style="--el-switch-on-color: #009b93"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" plain @click="add">
          {{ isAdd ? "新增" : "修改" }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
::v-deep .emptyLabel {
  .el-form-item__label {
    width: 54px;
    opacity: 0;
  }
}
::v-deep .el-upload--picture-card {
  width: 100px;
  height: 100px;
  img.el-upload-list__item-thumbnail {
    width: inherit;
    height: inherit;
  }
}
.el-input, .el-select {
  width: 300px;
}
</style>
