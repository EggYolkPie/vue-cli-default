import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import './permission'; // 权限
import './errorLog'; // 错误日志
import 'babel-polyfill';
import router from './router/router';
import store from './store';
import ELEMENT from 'element-ui';
import {
    loadStyle
} from './util/util'
import * as urls from '@/config/env';
import {
    iconfontUrl,
    iconfontVersion
} from '@/config/env';
import * as filters from './filters' // 全局filter
import './styles/common.scss';
// 引用fa图标字体
import './styles/icon_fonts/font-awesome.css'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);
import basicContainer from './components/basic-container/main'
import VueClipboard from 'vue-clipboard2'



// 引用echarts
// import myCharts from 'echarts'



import jq from './panel/jquery.min.js'
import './../src/assets/css/ztree/iconfont.css'
import './assets/css/font-awesome.min.css'






Vue.use(VueClipboard)

Vue.use(VueAxios, axios)

Vue.component('basicContainer', basicContainer)

Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
})

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;


export function createApp() {
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return {
        app,
        router,
        store
    }
}
