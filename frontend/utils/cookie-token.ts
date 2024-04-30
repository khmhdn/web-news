import Cookies from "js-cookie";

const TOKEN_KEY: string = "user_token";
const USER_ID: string = "user_id";

// user id Methods
export function getUserId() {
  return localStorage.getItem(USER_ID);
}
export function setUserId(userId: string) {
  return localStorage.setItem(USER_ID, userId);
}
export function removeUserId() {
  return localStorage.removeItem(USER_ID);
}

// Token Key Methods
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
export function setToken(token: string) {
  return Cookies.set(TOKEN_KEY, token);
}
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
