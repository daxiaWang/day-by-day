import { createApp } from "vue";
import ToastMessage from "./index.vue";

const createMount = options => {
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);

  const app = createApp(ToastMessage, {
    ...options,
    remove() {
      app.unmount(mountNode);
      document.body.removeChild(mountNode);
    }
  });
  return app.mount(mountNode);
};

const toast = options => {
  return createMount(options);
};

toast.install = app => {
  app.component("Toast", ToastMessage);
  app.config.globalProperties.$toast = toast;
};

export default toast;