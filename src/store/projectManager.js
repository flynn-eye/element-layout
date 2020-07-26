import {
    post,
    get
} from '../util/http'
const projectManager = {
    namespaced: true,
    state: {
        staffProject:[],
        location:null,
        projectDetail:null
    },
    mutations: {
        SETlocation(state,payLoad){
            state.location = payLoad
        },
        SETstaffProject(state,payLoad){
            state.staffProject = payLoad
        },
        SETprojectDetail(state,payLoad){
            state.projectDetail = payLoad
        }
    },
    actions: {
        getProjectList({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/project/projects',{...payLoad}).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        getStaffProject({commit},payLoad){
            let path = '/project/projectByEmpNo/'+payLoad
            if(payLoad)
            return new Promise((resolved,rejected)=>{
                get(path).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        getHeat({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/overtime/listProjectChart',payLoad).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        listProjectDownPersonalCount({commit},payLoad){
            return new Promise((resolved,rejected)=>{
                get('/overtime/listProjectDownPersonalCount',payLoad).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        projectInfo({commit},payLoad){
            let path = '/project/proInfo/'+payLoad
            return new Promise((resolved,rejected)=>{
                get(path).then(res=>{
                    resolved(res)
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
    }
}
export default projectManager