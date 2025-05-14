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

// 加入购物车
export function addToCart(data) {
  return http.post("member/cart", data);
}

// 购物车列表
export function getCardLists() {
  return http.get("member/cart");
}

// 删除购物车,写法与其他两种方式不同，需要多加一层data层封装数据
export function deleteCart(datas) {
  return http.delete("member/cart", {
    data: {
      ids: datas,
    },
  });
}

// 合并购物车
export function mergeCart(data) {
  return http.post("member/cart/merge", data);
}
