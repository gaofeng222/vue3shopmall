import { defineStore } from "pinia";
import { getCategoryList } from "@/apis/category";
// 定义一个数据状态pinia
export const useCategoryStore = defineStore("cateState", {
  state: () => ({
    categoryList: [],
  }),
  actions: {
    async getCategoryList() {
      console.log("90909090");
      try {
        const res = await getCategoryList();
        this.categoryList = res.result;
      } catch (error) {}
    },
  },
});
