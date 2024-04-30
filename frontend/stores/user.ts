import { defineStore } from "pinia";
import { _login, _getUser } from "@/api/auth";
import { ApiLoginData } from "@/constants/types";
import { getToken, setToken, removeToken } from "@/utils/cookie-token";

interface UserState {
  token: string | null;
  userId: string | null;
}

export const useUser = defineStore("user-store", {
  state: (): UserState => ({
    token: getToken() || null,
    userId: getUserId() || null,
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    setUserId(id: string) {
      this.userId = id;
      setUserId(id.toString());
    },

    async login(info: { email: string; password: string }) {
      return await _login({
        username: info.email,
        password: info.password,
      }).then(async (response) => {
        this.setToken(response.data.auth_token);
        await _getUser(response.data.auth_token).then((res) => {
          setUserId(res.data.id);
        });
      });
    },
    logout() {
      this.$reset();
      removeToken();
      removeUserId();
      navigateTo({ path: "/login" });
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
