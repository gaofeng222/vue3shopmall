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

export const getHotLists = () => {
  return http.get("home/hot");
};
