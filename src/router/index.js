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
          // fileUpload
          {
            path: '/home/filet',
            name: 'Filet',
            component: () =>
              import('../views/filet.vue')
          },
          {
            path: '/home/test',
            name: 'testMove',
            component: () =>
              import('../views/testMove.vue'),
            children: [
              {
                path: '/home/test/tableSon',
                name: 'TableSon',
                component: () =>
                  import('../views/vxTable.vue')
              },
              {
                path: '/home/test/tableMix',
                name: 'tableMix',
                component: () =>
                  import('../views/tableMix.vue')
              },
            ]
          },
          
   
       
          // {
          //   path: '/home/tableMix',
          //   name: 'tableMix',
          //   component: () =>
          //     import('../views/tableMix.vue')
          // },
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
          },
          // tableGrid
          {
            path: '/home/tableGrid',
            name: 'tableGrid',
            component: () =>
              import('../views/tableGrid.vue')
          },
          {
            path: '/home/fileUpload',
            name: 'fileUpload',
            component: () =>
              import('../views/fileUpload.vue')
          },
          {
            path: '/home/NestedSelect',
            name: 'NestedSelect',
            component: () =>
              import('../views/NestedSelect.vue')
          },
          {
            path: '/home/mdEditor',
            name: 'mdEditor',
            component: () =>
              import('../views/mdEditor.vue')
          },
          {
            path: '/home/input',
            name: 'input',
            component: () =>
              import('../views/input.vue')
          }
        ]
      },

    ]
  })