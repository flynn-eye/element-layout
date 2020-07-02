import {
    post
} from '../util/http'
const commonStore = {
    namespaced: true,
    state: {
        tagsConfig: [],
    },
    mutations: {
        ADD_tagsConfig(state, payload) {
            this.commit('commonStore/Update_tagsConfig')
            if (state.tagsConfig.length === 0) {
                payload['effect'] = 'dark'
                state.tagsConfig.push(payload)
            } else {
                if (state.tagsConfig.every((index) => index.key !== payload.key)) {
                    payload['effect'] = 'dark'
                    state.tagsConfig.push(payload)
                } else {
                    for (let i in state.tagsConfig) {
                        if (state.tagsConfig[i].key === payload.key) {
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
                    console.log(err)
                })
            })
        }
    }
}
export default commonStore