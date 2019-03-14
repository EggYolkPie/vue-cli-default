import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import './permission';
import './errorLog';
import router from './router/router';
import store from './store';
import VCharts from 'v-charts'
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
import '@smallwei/avue/lib/index.js';

import '@smallwei/avue/lib/theme-chalk/index.css';
import basicContainer from './components/basic-container/main'
import VueClipboard from 'vue-clipboard2'

import jq from './panel/jquery.min.js'


import './../src/assets/css/iconfont.css'
import './../src/assets/css/common.css'






import './assets/css/font-awesome.min.css'
import VueGridLayout from 'vue-grid-layout';

Vue.use(VCharts);
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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
