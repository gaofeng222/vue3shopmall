// 配置数据状态管理pinia
import { createPinia } from "pinia";
// 持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
function setupStore(app) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}

export default setupStore;
