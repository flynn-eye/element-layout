const routes = [{
    path: '/',
    redirect: '/userLayout/login'
  },
  {
    path: '/userLayout',
    name: 'UserLayout',
    component: () => import('../layout/UserLayout.vue'),
    children: [{
      name: 'Login',
      component: () => import('../views/user/Login.vue'),
      path: 'login'
    }]
  }, {
    path: '/pageLayout',
    name: 'PageLayout',
    component: () => import('../layout/PageLayout.vue'),
    children: [{
        name: 'ProjectManager',
        component: () => import('../views/pages/ProjectManager.vue'),
        path: 'projectManager',
        meta: {
          isMenu: true
        }
      },
      {
        name: 'RankManager',
        component: () => import('../views/pages/RankManager.vue'),
        path: 'rankManager',
        meta: {
          isMenu: true
        }
      },
      {
        name: 'StaffLayout',
        component: () => import('../views/pages/Staff/StaffLayout.vue'),
        path: 'StaffLayout',
        meta: {
          isMenu: true
        },
        children: [{
          name: 'StaffManager',
          component: () => import('../views/pages/Staff/StaffManager.vue'),
          path: 'StaffManager',
        }, {
          name: 'StaffDetail',
          component: () => import('../views/pages/Staff/StaffDetail.vue'),
          path: 'StaffDetail',
        }, {
          name: 'UpdateStaff',
          component: () => import('../views/pages/Staff/UpdateStaff.vue'),
          path: 'UpdateStaff',
        }]
      },
      {
        name: "DepartmentLayout",
        component: () => import('../views/pages/Department/DepartmentLayout.vue'),
        path: 'DepartmentLayout',
        meta: {
          isMenu: true
        },
        children: [{
          name: 'DepartmentManager',
          component: () => import('../views/pages/Department/DepartmentManager.vue'),
          path: 'departmentManager',
          meta: {
            isMenu: true
          }
        },{
          name: 'DepartmentDetail',
          component: () => import('../views/pages/Department/DepartmentDetail.vue'),
          path: 'departmentDetail',
          meta: {
            isMenu: true
          }
        }]
      }
    ]
  }
]
export default routes