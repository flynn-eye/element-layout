const routes = [{
      path: '/',
      redirect: '/userLayout/login'
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/exception/403.vue'),
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
    }
  ,
  {
    path: '/pageLayout',
    name: 'PageLayout',
    component: () => import('../layout/PageLayout.vue'),
    children: [{
        name: 'ProjectLayout',
        component: () => import('../views/pages/Project/ProjectLayout.vue'),
        path: 'projectLayout',
        children: [{
            name: 'ProjectManager',
            component: () => import('../views/pages/Project/ProjectManager.vue'),
            path: 'projectManager',
          },
          {
            name: 'ProjectDetail',
            component: () => import('../views/pages/Project/ProjectDetail.vue'),
            path: 'projectDetail',
          }
        ]
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
        }, {
          name: 'DepartmentDetail',
          component: () => import('../views/pages/Department/DepartmentDetail.vue'),
          path: 'departmentDetail',
          meta: {
            isMenu: true
          }
        }]
      }, {
        name: 'Permission',
        path: 'permission',
        component: () => import('../views/pages/Permission.vue'),
      }, {
        name: 'OverTime',
        path: 'overTime',
        component: () => import('../views/pages/OverTime.vue'),
      }
    ]
  }]
export default routes