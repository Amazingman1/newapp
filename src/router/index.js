import Router from 'vue-router'
import Vue from 'vue'
import Home from '../views/homePage.vue'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/table',
        name: 'tableMove',
        component: Home,
        children: [
          {
            path: '/home/table',
            name: 'TableMove',
            component: () =>
              import('../views/tableMove.vue')
          },
          {
            path: '/home/tableFa',
            name: 'TableFa',
            component: () =>
              import('../views/tableFa.vue')
          }
        ]
      },

    ]
  })