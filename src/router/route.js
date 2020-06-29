const routes = [
  {
    path: '/',
    redirect:'/userLayout/login'
  },
  {
    path: '/userLayout',
    name: 'UserLayout',
    component: () => import('../layout/UserLayout.vue'),
    children: [
      {
        name: 'Login',
        component: () => import('../views/user/Login.vue'),
        path: 'login'
      }
    ]
  },{
    path: '/pageLayout',
    name: 'PageLayout',
    component: () => import('../layout/PageLayout.vue'),
    children:[
      {
        name: 'first',
        component: () => import('../views/pages/first.vue'),
        path: 'first',
        meta:{
          isMenu:true
        }
      },
      {
        name: 'second',
        component: () => import('../views/pages/second.vue'),
        path: 'second',
        meta:{
          isMenu:true
        }
      },
      {
        name: 'third',
        component: () => import('../views/pages/third.vue'),
        path: 'third',
        meta:{
          isMenu:true
        }
      }
    ]
  }
  ]
export default routes