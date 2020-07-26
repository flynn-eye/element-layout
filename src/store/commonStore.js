import {
    post,
    get,
    put
} from '../util/http'
const commonStore = {
    namespaced: true,
    state: {
        tagsConfig: [],
        menuList:[],
        routes:[]
    },
    mutations: {
        ADD_tagsConfig(state, payload) {
            this.commit('commonStore/Update_tagsConfig')
            console.log(payload)
            if (state.tagsConfig.length === 0) {
                payload['effect'] = 'dark'
                state.tagsConfig.push(payload)
            } else {
                if (state.tagsConfig.every((index) => index.menuId !== payload.menuId)) {
                    payload['effect'] = 'dark'
                    state.tagsConfig.push(payload)
                } else {
                    for (let i in state.tagsConfig) {
                        if (state.tagsConfig[i].menuId === payload.menuId) {
                            state.tagsConfig[i]['effect'] = 'dark'
                        }
                    }
                }
            }
        },
        Del_tagsConfig(state, payload) {
            state.tagsConfig.splice(payload, 1)
        },
        Update_tagsConfig(state, payload) {
            for (let i in state.tagsConfig) {
                state.tagsConfig[i].effect = 'light'
            }
            if (typeof payload === 'number') {
                state.tagsConfig[payload].effect = 'dark'
            }
        }
    },
    actions: {
        login({commit},payload) {
            return new Promise((resolved, rejected) => {
                post('/emp/login', {
                    
                }, {
                    ...payload
                }).then(res => {
                    resolved(res)
                }).catch(err => {
                    rejected(err)
                })
            })
        },
        getPermission({commit},payload){
            return new Promise((resolved, rejected) => {
                get('/menu/findMenusAndRoutes').then(res => {
                    resolved(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        getAllMenu(){
            return new Promise((resolved, rejected) => {
                get('/menu/menus').then(res => {
                    resolved(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        getMenuById({commit},payload){
            return new Promise((resolved, rejected) => {
                get('/menu/listMenuByRankId',payload).then(res => {
                    resolved(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        changePermission({commit},payload){
            return new Promise((resolved, rejected) => {
                put('/menu/updateMenuRank',payload).then(res => {
                    resolved(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        }
    }
}
export default commonStore