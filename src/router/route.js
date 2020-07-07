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
        name: 'ProjectManager',
        component: () => import('../views/pages/ProjectManager.vue'),
        path: 'projectManager',
        meta:{
          isMenu:true
        }
      },
      {
        name: 'RankManager',
        component: () => import('../views/pages/RankManager.vue'),
        path: 'rankManager',
        meta:{
          isMenu:true
        }
      },
      {
        name: 'DepartmentManager',
        component: () => import('../views/pages/DepartmentManager.vue'),
        path: 'departmentManager',
        meta:{
          isMenu:true
        }
      },
      {
        name: 'StaffLayout',
        component: () => import('../views/pages/Staff/StaffLayout.vue'),
        path: 'StaffLayout',
        meta:{
          isMenu:true
        },
        children:[
          {
            name: 'StaffManager',
            component: () => import('../views/pages/Staff/StaffManager.vue'),
            path: 'StaffManager',
          }
        ]
      }
    ]
  }
  ]
export default routes