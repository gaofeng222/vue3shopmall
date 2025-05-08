import { defineStore } from "pinia";
import axios from "axios";
// 定义一个数据状态pinia
export const userState = defineStore("userState", {
  state: () => ({
    dataList: [], // 数据列表
    loading: false, // 加载状态
    errorMsg: "", // 错误信息
  }),
  actions: {
    // 获取数据列表
    async fetchData() {
      this.loading = true;
      try {
        const response = await axios.get("/list");
        console.log("🚀 ~ fetchData ~ response:", response);
        this.dataList = response.data.data;
        this.errorMsg = "";
      } catch (err) {
        console.error(err);
        this.errorMsg = "获取数据失败";
      } finally {
        this.loading = false;
      }
    },
  },
});
