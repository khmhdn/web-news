import Toast, { POSITION, PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== "undefined") {
    nuxtApp.vueApp.use(Toast, {
      position: POSITION.TOP_CENTER,
      timeout: 3000,
    } as PluginOptions);
  }
});
