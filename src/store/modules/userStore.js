import { defineStore } from "pinia";
import axios from "axios";
// 定义一个数据状态pinia
export const useUserStore = defineStore("userState", {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    // 获取数据列表
    async fetchData() {},
    clearUserInfo() {},
  },
});
