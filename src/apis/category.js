import http from "@/utils/request";

export const getCategoryList = () => {
  return http.get("home/category/head");
};
