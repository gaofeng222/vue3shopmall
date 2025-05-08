// 配置数据状态管理pinia
import { createPinia } from "pinia";

function setupStore(app) {
  const pinia = createPinia();
  app.use(pinia);
}

export default setupStore;
