<script setup>
import { reactive, defineProps, defineEmits, ref, watch, onMounted } from "vue";
import { delMenu } from "@/api/menuList.js";
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
const defaultProps = {
  children: "subMenu",
  label: "label",
};
const menuStore = useMenu();
const tree = reactive({
  data: [],
});
onMounted(() => {
  tree.data = menuStore.menuTree;
});

const filterText = ref("");
const treeRef = ref(null);
function filterNode(value, data) {
  if (!value) return true;
  return data.label.includes(value);
}
// 将输入框的值与过滤树节点关联
watch(filterText, (val) => {
  // tree自带filter方法，val参数会传给 filterNode 第一个参数
  treeRef.value.filter(val);
});
async function submit() {
  const selectedIds = treeRef.value.getCheckedKeys(false);
  const res = await delMenu({delMenuIds: selectedIds})
  if(res.status === 200) {
    ElMessage.success('删除成功')
    await menuStore.getMenuList();
    close()
  }
}
const emits = defineEmits(["update:showDialog"]);
function close() {
  emits("update:showDialog", false);
}
</script>
<template>
  <el-dialog
    v-model="showDialog"
    title="删除菜单"
    width="600px"
    append-to-body
    @close="close"
    v-if="showDialog"
  >
    <el-alert title="删除后无法恢复，请谨慎操作！" type="warning" />
    <el-input v-model="filterText" placeholder="搜索菜单" clearable></el-input>
    <el-tree
      ref="treeRef"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :data="tree.data"
      :props="defaultProps"
      :filter-node-method="filterNode"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.el-alert {
  margin-bottom: 20px;
}
</style>
