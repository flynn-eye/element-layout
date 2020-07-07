import {
    post,
    get,
    del,
    put
} from '../util/http'
const departmentManager = {
    namespaced: true,
    state: {
        tagsConfig: [],
    },
    mutations: {
    },
    actions: {
        departmentListWithoutPage({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/dept/depts').then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        departmentList({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                post('/dept/deptsByForms',{},{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        addDepartment({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                post('/dept/insert',{},{
                    ...payLoad
                }).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        delDept({commit},payLoad){
            let path = '/dept/delete/'
            path+=payLoad
            return new Promise((resolved,rejected)=>{
                del(path).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        updateDept({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                put('/dept/update',{},{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        }
    }
}
export default departmentManager