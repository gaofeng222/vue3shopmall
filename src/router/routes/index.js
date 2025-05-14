// 导入组件
import Home from "@v/Home";
import Layout from "@v/Layout";
import Login from "@v/Login";
import Catagory from "@v/Category";
import Page404 from "@v/Page404";
import SubCategory from "@v/SubCategory";
import GoodsDetail from "@v/Detail";
// 创建路由配置对象
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
        },
        component: Home,
      },
      // {
      //   path: "/category/:id",
      //   name: "category",
      //   meta: {
      //     title: "分类页",
      //   },
      //   component: Catagory,
      // },
      {
        path: "/category",
        name: "category",
        meta: {
          title: "分类页",
        },
        // component: Catagory,
        redirect: "/category/:id",
        children: [
          {
            path: "/category/sub/:id",
            name: "sub-category",
            meta: {
              title: "子分类页",
            },
            component: SubCategory,
          },
          {
            path: "/category/:id",
            name: "category-id",
            meta: {
              title: "分类页",
            },
            component: Catagory,
          },
        ],
      },
      {
        path: "/detail/:id",
        name: "detail-id",
        meta: {
          title: "详情页",
        },
        component: GoodsDetail,
      },
      {
        path: "/cartlist",
        name: "cartlist",
        meta: {
          title: "购物车",
        },
        component: () => import("@v/CartList"),
      },
      {
        path: "/checkout",
        name: "checkout",
        meta: {
          title: "结算页",
        },
        component: () => import("@v/Checkout"),
      },
      {
        path: "pay",
        name: "pay",
        meta: {
          title: "支付页",
        },
        component: () => import("@v/Pay"),
      },
      {
        // 付款成功后返回的路径
        path: "/paycallback",
        name: "payback",
        meta: {
          title: "支付成功页",
        },
        component: () => import("@v/Pay/PayBack.vue"),
      },
    ],
  },
  { path: "/login", component: Login },
  // 404页面
  { path: "/:pathMatch(.*)*", component: Page404 },
];

export default routes;
