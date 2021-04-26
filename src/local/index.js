import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';
import EN from './langs/en.json'
import CN from './langs/cn.json'
import { localRead, } from '@/libs/utils'
Vue.use(VueI18n);

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh' || navLang === 'en') ? navLang : false
let lang = localLang || localRead('local') || 'zh'

Vue.config.lang = lang

Vue.locale = () => {};
const messages = {
    en: Object.assign(EN, en),
    zh: Object.assign(CN, zh)
};
const i18n = new VueI18n({
    locale: lang,
    messages 
});
export default i18n