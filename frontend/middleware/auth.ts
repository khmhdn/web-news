import { useUser } from "@/stores/user";
const user = useUser();

export default defineNuxtRouteMiddleware((to, from) => {
  if (!user.isAuthenticated) {
    return "/login";
  }
});
