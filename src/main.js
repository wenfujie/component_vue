// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './Index'
import router from './router'
import "./assets/css/reset.css";
import "./assets/css/common.css";
import "@zoesoft.com.cn/zoeicon-font";
import "../zoehisVue/packages/theme/default/index.scss";
import axios from "axios";
import zoehisUI from  "../zoehisVue/src/index";
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
Vue.use(zoehisUI);
window.langType = "zh";
//es6 写法 下面对象messages，相当于menssages:{xxx:xxx}
//TODO  加载loading中
const i18n = new VueI18n({
  locale: window.langType,//本地语言
  fallbackLocale: 'zh'//,//失败调用的语言
  //messages
});
//i18n.setLocaleMessage('zh', zh);
i18n.locale = window.langType;
const loadLocaleMessage = function (locale, cb) {
  import(`../zoehisVue/src/locale/${locale}.js`).then(module => {
      if (cb) {
        cb(module.default);
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};
loadLocaleMessage(window.langType, (message)=> {
  i18n.setLocaleMessage('zh', message);
  new Vue({
    el: '#app',
    i18n,
    router,
    template: '<Index/>',
    components: {Index},
    created(){
      this.$messageBox.setDefaults({
        title: this.$t("zoehisUI.messagebox.title"),
        confirmButtonText: this.$t("zoehisUI.messagebox.confirmButtonText"),
        noButtonText: this.$t("zoehisUI.messagebox.noButtonText"),
        cancelButtonText: this.$t("zoehisUI.messagebox.cancelButtonText"),
        yesButtonText: this.$t("zoehisUI.messagebox.yesButtonText"),
        errorSlideDownName: this.$t("zoehisUI.messagebox.errorSlideDownName"),
        errorSlideUpName: this.$t("zoehisUI.messagebox.errorSlideUpName"),
        sendManager: this.$t("zoehisUI.messagebox.sendManager")
      })
    }
  });
})
