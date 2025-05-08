import http from "@/utils/request";

export function getList(params) {
  return http.get("home/category/head", { params });
}
