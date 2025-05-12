// 通过插件的方式把components中的所组件都进行全局化注册
import ImageView from "./gf-image-view.vue";
import Sku from "./GfSku/index.vue";
const componentsPlugin = {
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component("GfImageView", ImageView);
    app.component("GfSku", Sku);
  },
};

function createCustomPlugins(app) {
  app.use(componentsPlugin);
}

export default createCustomPlugins;
