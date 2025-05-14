import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { toRaw } from "vue";
import { addToCart, getCardLists, deleteCart } from "@/apis/category";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: [],
    allPrice: 0,
  }),
  getters: {
    allCount(state) {
      return state.cartList.reduce((total, item) => total + item.count, 0);
    },
    allPrice(state) {
      return state.cartList.reduce(
        (total, item) => total + item.count * item.price,
        0
      );
    },
    allChecked(state) {
      return state.cartList.every((item) => item.isChecked === true);
    },
    isLogin() {
      const userStore = useUserStore();
      return userStore.userInfo?.token;
    },
    selectedPrice(state) {
      return state.cartList.reduce((total, item) => {
        if (item.selected) {
          return total + item.count * item.price;
        } else {
          return total;
        }
      }, 0);
    },
    selectedCount(state) {
      return state.cartList.reduce((total, item) => {
        if (item.selected) {
          return total + item.count;
        } else {
          return total;
        }
      }, 0);
    },
  },
  actions: {
    async addCart(goods) {
      const { skuId, count } = goods;
      // 登录后才加入购物车
      if (this.isLogin) {
        // 加入购物车接口
        await addToCart({ skuId, count });
        this.updateNewList();
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
    async delCart(skuId) {
      if (this.isLogin) {
        // 调用接口实现接口购物车中的删除功能
        await deleteCart([skuId]);
        this.updateNewList();
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = this.cartList.findIndex((item) => skuId === item.skuId);
        this.cartList.splice(idx, 1);
      }
    },

    async updateNewList() {
      const res = await getCardLists();
      this.cartList = res.result;
    },
    clearCart() {
      this.cartList = [];
    },
    handleSelected(value) {
      if (!value.length) {
        this.cartList.forEach((item) => {
          item.selected = false;
        });
      } else if (value.length === this.cartList.length) {
        this.cartList.forEach((item) => {
          item.selected = true;
        });
      } else {
        this.cartList.forEach((item) => {
          item.selected = value.includes(toRaw(item)) ? true : false;
        });
      }
    },
  },
  persist: true,
});
