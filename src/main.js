/*
 * @Author: wangxuan 10590
 * @Date: 2024-08-27 21:46:24
 * @LastEditors: wangxuan 10590
 * @LastEditTime: 2024-08-27 21:50:34
 * @FilePath: \newapp\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VxeUI)
Vue.use(VxeUITable)
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
