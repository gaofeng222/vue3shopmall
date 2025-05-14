import http from "@/utils/request";

export function loginSys(data) {
  return http.post("login", { ...data });
}

export function getLikeList(params) {
  return http.get("/goods/relevant", {
    params,
  });
}
