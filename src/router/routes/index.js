// 导入组件
import Home from "@v/Home";
import Layout from "@v/Layout";
import Login from "@v/Login";
import Catagory from "@v/Category";
import Page404 from "@v/Page404";
// 创建路由配置对象
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/category",
        component: Catagory,
      },
    ],
  },
  { path: "/login", component: Login },
  // 404页面
  { path: "/:pathMatch(.*)*", component: Page404 },
];

export default routes;
