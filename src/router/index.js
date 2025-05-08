// 配置vue3的路由
import { createRouter, createWebHashHistory } from "vue-router";

// 导入组件
import Home from "@v/Home";
import About from "@v/About";

// 创建路由配置对象
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // 使用hash模式
  routes, // 传入路由配置数组
});

function createRouterApp(app) {
  return app.use(router);
}

export default createRouterApp;
