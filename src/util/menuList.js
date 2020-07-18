const menuList = [
    {
        name: '加班系统',
        key: '1',
        icon:'el-icon-s-help',
        children: [{
                name: '项目管理',
                path: '/pageLayout/projectManager',
                key: '1-1',
                icon:'el-icon-s-help',
            },
            {
                name: '职级管理',
                path: '/pageLayout/rankManager',
                key: '1-2'
            },
            {
                name: '部门管理',
                path: '/pageLayout/DepartmentLayout/departmentManager',
                key: '1-3'
            },
            {
                name: '员工管理',
                path: '/pageLayout/StaffLayout/staffManager',
                key: '1-4'
            }
        ]
        
    },
    {
        name: '系统设置',
        key: '2',
        icon:'el-icon-s-tools'
    }
]
export default menuList