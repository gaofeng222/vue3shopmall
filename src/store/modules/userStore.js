import { defineStore } from "pinia";
import { loginSys } from "@/apis/sys";
import { mergeCart } from "@/apis/category";

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
        const dataLists = store.cartList;

        // 准备发送给服务器的数据
        const postData = dataLists.map((item) => ({
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        }));
        // 合并本地购物车数据和服务器返回的购物车数据
        await mergeCart(postData);

        // 更新购物车数据列表
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
