import http from "@/utils/request";

export const getCategoryList = () => {
  return http.get("home/category/head");
};

export const getBannerLists = () => {
  return http.get("home/banner");
};

export const getNewLists = () => {
  return http.get("home/new");
};

/**
 * 获取热门列表
 *
 * @returns Promise 包含热门列表数据的 Promise 对象
 */
export const getHotLists = () => {
  return http.get("home/hot");
};

export const getGoodsLists = () => {
  return http.get("home/goods");
};
