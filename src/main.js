import { createApp } from "vue";
import setupStore from "./store";
import createRouter from "./router";
import createDirectives from "./directives";
import customPlugin from "./plugins";
import "@a/styles/common.scss";

// 自定义主题样式文件
import "@a/styles/element-plus/index.scss";
// 导入 ElementPlus 和 样式文件
import ElementPlus from "element-plus";

import App from "./App.vue";
const app = createApp(App);

// 使用 ElementPlus
app.use(ElementPlus);

// 安装 store
setupStore(app);

// 安装路由
createRouter(app);
console.log(1111111);

// 注册全局指令
createDirectives(app);

// 注册自定义插件
app.use(customPlugin);

app.mount("#app");
