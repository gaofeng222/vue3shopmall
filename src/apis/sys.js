import http from "@/utils/request";

export function loginSys(data) {
  return http.post("login", { ...data });
}
