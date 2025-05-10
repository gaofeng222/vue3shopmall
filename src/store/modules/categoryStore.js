import { defineStore } from "pinia";
import { getCategoryList } from "@/apis/index";
// 定义一个数据状态pinia
export const useCategoryStore = defineStore("cateState", {
  state: () => ({
    categoryList: [],
  }),
  actions: {
    async getCategoryList() {
      try {
        const res = await getCategoryList();
        this.categoryList = res.result;
      } catch (error) {}
    },
  },
});
