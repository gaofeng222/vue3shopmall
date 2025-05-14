import { defineStore } from "pinia";
import { loginSys } from "@/apis/sys";
import { useCartStore } from "./cartStore";
// 定义一个数据状态pinia
export const useUserStore = defineStore("userState", {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    // 获取数据列表
    async fetchData() {},
    clearUserInfo() {
      const store = useCartStore();
      this.userInfo = {};
      // TODO:重置所有的路由信息，刷新页面
      store.clearCart();
    },

    async loginSystem(data) {
      console.log("🚀 ~ loginSystem ~ data:", data);
      const res = await loginSys(data);
      if (res.code == 1) {
        this.userInfo = res.result;

        // 获取购物车数据
        const store = useCartStore();
        store.updateNewList();
      } else {
        this.userInfo = {};
      }
      return res;
    },
  },
  getters: {},
  persist: true,
});
