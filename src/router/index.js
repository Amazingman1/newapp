import Router from 'vue-router'
import Vue from 'vue'
import Home from '../views/homePage.vue'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
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
          },
          {
            path: '/home/tableSon',
            name: 'TableSon',
            component: () =>
              import('../views/vxTable.vue')
          },
          {
            path: '/home/tableMix',
            name: 'tableMix',
            component: () =>
              import('../views/tableMix.vue')
          },
          {
            path: '/home/TreeSelect',
            name: 'TreeSelect',
            component: () =>
              import('../views/TreeSelect.vue')
          },
          {
            path: '/home/rootPage',
            name: 'rootPage',
            component: () =>
              import('../views/rootPage.vue')
          },
          {
            path: '/home/rootTree',
            name: 'treeRoot',
            component: () =>
              import('../views/treeRoot.vue')
          },
          {
            path: '/home/tableFilter',
            name: 'tableFilter',
            component: () =>
              import('../views/tableFilter.vue')
          }
        ]
      },

    ]
  })