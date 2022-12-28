import { defineStore } from 'pinia'
import { menuList } from '@/api/menuList.js'
import {ElMessage} from 'element-plus'
import { listToTree } from '@/utils/handleData.js'
import { toRefs } from 'vue'
export const useMenu = defineStore('menuList', {
  state: () => {
    return {
      menus: [],
      curMenuId: 0,
      // breadList: [],// 面包屑数据
    }
  },
  actions: {
    // 获取菜单数据
    async getMenuList() {
      try {
        const res = await menuList({id:1})
        if( res?.status === 200 && res?.data?.length) {
          // const data = listToTree(res.data, 'id', 'parentId', 'subMenu')
          
          this.menus = res.data
        }else {
          this.menus = []
        }
      }catch(err) {
        console.log('服务器错误', err.message);
      }
    },
    updateCurMenu(value) {
      this.curMenuId = value
    },
  },
  getters: {
    menuTree: state => listToTree(state.menus, 'id', 'parentId', 'subMenu'),
    curMenuData: state => state.menus.find( item => item.id == state.curMenuId)
  }
})