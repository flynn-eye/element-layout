import {
    post,
    del,
    put,
    get
} from '../util/http'
const staffManager = {
    namespaced: true,
    state: {
        searchResult :[],
        location:null,
        staffDetail:null,//一个员工的信息
        staffHeat:[],
    },
    mutations: {
        SETlocation(state,payLoad){
            state.location = payLoad
        },
        SETstaffDetail(state,payLoad){
            state.staffDetail = payLoad
        },
        SETstaffHeat(state,payLoad){
            state.staffHeat = []
            for(let i = 0;i<payLoad.length;i++){
                state.staffHeat.push(payLoad)
            }
            
        }
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
        },
        getStaffLeaders({commit},payLoad){
            let path = '/emp/listLeaderByEmpNo/'+payLoad
            return new Promise((resolved,rejected)=>{
                get(path).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        getStaffHeat({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/overtime/listPersonalChart',{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        getStaffPie({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/overtime/listPersonalCountChart',{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        }
    }
}
export default staffManager