import {
    post,
    del,
    put,
} from '../util/http'
const staffManager = {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        getStaff({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                post('/emp/empsByForms',{},{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        addStaff({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                post('/emp/insert',{},{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        delStaff({commit},payLoad){
            let path = '/emp/delete/'+payLoad
            return new Promise((resolved,rejected)=>{
                del(path).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        handleSearch({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/emp/empsByEmpNoAndEmpName',{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        }
    }
}
export default staffManager