import http from "@/utils/request";

export function categoryLists(params) {
  return http.get("category", { params });
}
