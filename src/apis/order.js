import http from "@/utils/request";

// 生成-订单(结算页)
export function getCheckInfo() {
  return http.get("member/order/pre");
}

// 提交-订单
export function submitOrder(data) {
  return http.post("member/order", data);
}

// 获取-订单详情(以及支付结果)
export function getOrderDetail(id) {
  return http.get(`member/order/${id}`);
}
