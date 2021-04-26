import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import config from '@/config'
// import importDirective from '@/directive'
import store from "./store";
import ViewUI from "iview";
import "iview/dist/styles/iview.css";
import i18n from "./local";

Vue.config.productionTip = false;

Vue.use(ViewUI, {
    i18n: (key, value) => i18n.t(key, value)
});

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

// new Vue({
//     router,
//     store,
//     i18n,
//     render: h => h(App)
// }).$mount("#app");

/**
 * 注册指令
 */
// importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})