// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'babel-polyfill'
import Vuex from 'vuex'
Vue.use(Vuex)
    // 配置全局的Ajax
Vue.prototype.$http = axios
import VueI18n from 'vue-i18n'
import App from './App'
import VueCookies from 'vue-cookies'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import './components/css/bana-global.css'
import './components/css/fvs.css'
import './components/css/bana-element.css'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

//最后引用router，否则build后组件内样式会被覆盖
import router from './router'

import 'element-ui/lib/index.js'

const store = new Vuex.Store({
    state: {
        mapobj: null, //地图对象
        includePageNames: [], //缓存路由数组
    },
    mutations: {
        saveobj(state, mapobj) {
            state.mapobj = mapobj
        }
    }
})
Vue.prototype.$store = store

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(VueCookies);
Vue.prototype.$http = VueResource;
// 表单校验引入
import filterRules from './components/js/rules';
Vue.prototype.filterRules = filterRules;

const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages: {
        'zh': require('./common/lang/zh'), //中文语言包
        'en': require('./common/lang/en') //英文语言包
    }
})


/* eslint-disable no-new */
let a = new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
})

export { a }