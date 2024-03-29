<script setup>
import { useRouter } from "vue-router";
import { watch, reactive, ref, watchEffect } from "vue";
import {
  getSiteList,
  delSite,
  colSite,
  siteDetail,
  addVisitTimes,
} from "@/api/siteList.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useMenu } from "@/stores/menuList.js";
import CreateSiteDialog from "./components/createSite.vue";
import useRenderH from "@/hooks/useRenderH.js";
import Pagination from "@/components/pagination.vue";
import empty from "../../assets/images/empty-light.png";
import { fromNow } from "@/utils/index.js";
const router = useRouter();
let count = ref(5);
const siteList = reactive({
  lists: [],
  total: 0,
  loading: false,
  params: {
    id: 0,
    currentPage: 1,
    pageSize: 10,
    uid: localStorage.getItem('uid')
  },
});
//

async function getSiteLists() {
  siteList.params.id = router.currentRoute.value.params.id * 1;
  siteList.loading = true;
  try {
    const res = await getSiteList(siteList.params);
    const { data, status, total } = res;
    if (data.length && status === 200) {
      data.forEach((item) => {
        item.lastVisitedTime = fromNow(new Date(item.lastVisitedTime).getTime());
      });
      siteList.lists = data;
      siteList.total = total;
    } else {
      siteList.lists = [];
      // node未实现返回total，暂时注释掉，否则分页条强制跳转到第一页
      // siteList.total = 0;
    }
  } catch (err) {
    console.log("服务器错误", err.message);
  } finally {
    siteList.loading = false;
  }
}
const menuStore = useMenu();
// watchEffect(() => {
//   const id = router.currentRoute.value.params.id;
//   menuStore.updateCurMenu(id);
//   console.log('watcheffect');
//   getSiteLists(id);
// });
watch(
  () => router.currentRoute.value.params.id,
  (n, o) => {
    if (n && n != o) {
      menuStore.updateCurMenu(n);
      getSiteLists();
    }
  },
  {
    immediate: true,
  }
);

const showDialog = ref(false);
const siteInfo = reactive({
  detail: {},
});
function add() {
  showDialog.value = true;
  siteInfo.detail = {};
}
function deleteSite(id) {
  ElMessageBox.confirm("确认删除当前网站吗？", "通知", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await delSite({ id });
    if (res.status == 200) {
      ElMessage.success("删除成功");
      getSiteLists();
    } else {
      ElMessage.error(`操作失败，${res.msg}`);
    }
  });
}
async function collectSite(...params) {
  const [id, curVal] = params;
  const res = await colSite({ id, curVal });
  if (res.status === 200) {
    ElMessage.success(`${curVal === 1 ? "取消" : ""}收藏成功`);
    getSiteLists();
  } else {
    ElMessage.error(`操作失败，${res.msg}`);
  }
}

watch(showDialog, (n, o) => {
  if (!n) {
    siteInfo.detail = {};
  }
});
async function getSiteDetail(id) {
  const res = await siteDetail({ id });
  if (res.status === 200) {
    siteInfo.detail = res.data[0];
  } else {
    ElMessage.error(`获取详情失败, ${res.msg}`);
  }
}
async function editCurSite(id) {
  await getSiteDetail(id);
  showDialog.value = true;
}
async function jumpToSite({ link: url, id, visitTimes }) {
  try {
    await addVisitTimes({ id, visitTimes });
    useRenderH()
    .then(() => {
      window.open(url);
    });
  } catch (error) {
    ElMessage.error("跳转出错，请检查链接是否正确", error);
  }
}

// 分页查询
function handleCurrentChange(val) {
  siteList.params.currentPage = val;
  getSiteLists();
}
function handleSizeChange(val) {
  siteList.params.pageSize = val;
  siteList.params.currentPage = 1;
  getSiteLists();
}
</script>
<template>
  <div id="siteList" v-loading="siteList.loading">
    <div class="operationBtns">
      <el-button type="primary" plain @click="add">新增</el-button>
    </div>
    <!-- <useRenderH/> -->
    <div class="list" v-if="siteList.lists.length">
      <div
        class="siteItem"
        v-for="item in siteList.lists"
        @click.stop="jumpToSite(item)"
      >
        <div class="img" @click.stop="">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.icon"
            fit="cover"
            :preview-src-list="[item.icon]"
            hide-on-click-modal
          ></el-image>
        </div>
        <div class="content">
          <div class="main">
            <div class="title">
              <b>{{ item.label }}</b>
              <!-- <span>{{ item.lastVisitedTime }}</span> -->
            </div>
            <div class="desc">{{ item.description }}</div>
          </div>
          <div class="operation">
          <!-- <div class="operation animate__animated animate__bounceIn"> -->
            <div>
              <div class="placeholder"></div>
              <el-icon
                :class="item.isCollect === 1 ? 'select' : 'noselect'"
                @click.stop="collectSite(item.id, item.isCollect)"
                class="delay30"
              >
                <StarFilled v-if="item.isCollect === 1" />
                <Star v-else />
              </el-icon>
            </div>
            <div>
              <div class="placeholder"></div>
            <el-icon @click.stop="editCurSite(item.id)" class="delay60"><Edit /></el-icon>
            </div>
            <el-icon class="del delay90" @click.stop="deleteSite(item.id)"
              ><Delete
            /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <el-image :src="empty" fit="cover"></el-image>
    </div>
  </div>
  <Pagination
    v-model:currentPage="siteList.params.currentPage"
    :pageSize="siteList.params.pageSize"
    :small="false"
    :total="siteList.total"
    background
    @currentChange="handleCurrentChange"
    @sizeChange="handleSizeChange"
    v-if="siteList.lists.length"
  />
  <CreateSiteDialog
    v-model:showDialog="showDialog"
    @operaSuccess="getSiteLists"
    :siteDetail="siteInfo.detail"
    :count="count"
  />
</template>
<style scoped>
.empty {
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.siteItem {
  position: relative;
}
.siteItem::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 6px;
  /* background: #13adf5; */
  background: linear-gradient(120deg, #13adf5 0%, #0875e7 88%);
  border-radius: 3px;
  transition: all .3s ease-in-out;
}
.siteItem:hover:after {
  width: 180px;
  margin-left: -90px;
}
.delay30 {
  animation-delay: 30ms;
}
.delay60 {
  animation-delay: 60ms;
}
.delay90 {
  animation-delay: 90ms;
}
</style>
