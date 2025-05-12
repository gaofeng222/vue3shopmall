import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: [],
  }),
  actions: {
    addCart(goods) {
      const userStore = useUserStore();
      const isLogin = userStore.userInfo?.token;
      this.cartList.push(goods);
      // 登录后才加入购物车
      if (isLogin) {
        // 加入购物车接口
      } else {
        // 未登录，加入本地存储
        const item = this.cartList.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count += goods.count;
        } else {
          this.cartList.push(goods);
        }
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    clearCart() {
      this.cartList = [];
    },
  },
  persist: true,
});
