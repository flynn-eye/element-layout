const menuList = [
    {
        name: '一级导航菜单',
        key: '1',
        icon:'el-icon-location',
        children: [{
                name: '项目管理',
                path: '/pageLayout/projectManager',
                key: '1-1'
            },
            {
                name: '职级管理',
                path: '/pageLayout/rankManager',
                key: '1-2'
            },
            {
                name: '部门管理',
                path: '/pageLayout/departmentManager',
                key: '1-3'
            },
            {
                name: '员工管理',
                path: '/pageLayout/StaffLayout/staffManager',
                key: '1-4'
            }
        ]
        
    }
]
export default menuList