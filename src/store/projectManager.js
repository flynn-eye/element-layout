import {
    post,
    get
} from '../util/http'
const projectManager = {
    namespaced: true,
    state: {
        staffProject:[]
    },
    mutations: {
        SETstaffProject(state,payLoad){
            state.staffProject = payLoad
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
        }
    }
}
export default projectManager