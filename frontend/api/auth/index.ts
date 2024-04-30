import request from "../base";
import { ApiLoginData, ApiRegisterData } from "@/constants/types";

export function _login(data: ApiLoginData) {
  return request({
    url: "auth/token/login/",
    method: "post",
    data: data,
  });
}

export function _register(data: ApiRegisterData) {
  return request({
    url: "auth/users/",
    method: "post",
    data: data,
  });
}

export function _getUser(token: string) {
  return request({
    url: "auth/users/me/",
    method: "get",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
