import http from "@/utils/request";

export function categoryLists(params) {
  return http.get("category", { params });
}

// 获取二级分类
export function categoryLists2(params) {
  return http.get("category/sub/filter", { params });
}

// 获取二级分类筛选
export function getSubCategoryFilter(data) {
  return http.post("category/goods/temporary", { ...data });
}

// 获取商品详情
export function getGoodsDetail(params) {
  return http.get("goods", { params });
}

export function getGoodsHot(params) {
  return http.get("goods/hot", { params });
}
