import {
    get,
    post,
    del
} from '../util/http'
const rankManager = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        getRankList() {
            return new Promise((resolved, rejected) => {
                get('/rank/ranks')
                    .then(res => {
                        resolved(res)
                    }).catch(err => {
                        console.log(err)
                    })
            })
        },
        getChildRank({
            commit
        }, payLoad) {
            let path = '/rank/findChildRankById/'
            path += payLoad
            if (payLoad)
                return new Promise((resolved, rejected) => {
                    get(path)
                        .then(res => {
                            resolved(res)
                        }).catch(err => {
                            console.log(err)
                        })
                })
        },
        addRank({
            commit
        }, payLoad) { //更新&添加，传id时更新
            return new Promise((resolved, rejected) => {
                post('/rank/insert', {}, {
                        ...payLoad
                    })
                    .then(res => {
                        resolved(res)
                    }).catch(err => {
                        console.log(err)
                    })
            })
        },
        delRank({
            commit
        }, payLoad) {
            let path = '/rank/delete/'
            path += payLoad
            return new Promise((resolved, rejected) => {
                del(path)
                    .then(res => {
                        resolved(res)
                    }).catch(err => {
                        console.log(err)
                    })
            })
        },
        getParentRank({
            commit
        }, payLoad) {
            let path = '/rank/findAllParentById/'
            path += payLoad
            if (payLoad)
                return new Promise((resolved, rejected) => {
                    get(path)
                        .then(res => {
                            resolved(res)
                        }).catch(err => {
                            console.log(err)
                        })
                })
        }
    }
}
export default rankManager