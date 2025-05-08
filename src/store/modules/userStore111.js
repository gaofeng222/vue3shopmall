import { reactive, toRefs } from "vue";
import axios from "axios";
// 定义一个数据状态pinia
export const userState = function () {
  const state = reactive({
    dataList: [], // 数据列表
    loading: false, // 加载状态
    errorMsg: "", // 错误信息
  });

  const getDataList = async () => {
    try {
      state.loading = true;
      const res = await axios.get("/list");
      if (res.status === 200) {
        state.dataList = res.data.data;
      } else {
        throw new Error("数据获取失败");
      }
    } catch (error) {
      console.log(error);
      state.errorMsg = error.message;
    } finally {
      state.loading = false;
    }
  };
  return {
    ...toRefs(state),
    getDataList,
  };
};
