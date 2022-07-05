import storageService from '@/request/storageService'
import request from '@/request/adminRequest'

const adminModule = {
    namespaced: true,
    state: {
        adminToken: storageService.get(storageService.ADMIN_TOKEN),
        adminInfo: storageService.get(storageService.ADMIN_INFO) ? JSON.parse(storageService.get(storageService.ADMIN_INFO)) : null,

    },
    mutations: {
        SET_ADMINTOKEN (state, token) {
            // 更新本地缓存
            storageService.set(storageService.ADMIN_TOKEN, token);
            // 更新state
            state.adminToken = token;
        },
        SET_ADMININFO (state, adminInfo) {
            // 更新缓存
            storageService.set(storageService.ADMIN_INFO, JSON.stringify(adminInfo));
            // 更新state
            state.adminInfo = adminInfo;
        },


    },
    actions: {
        login (context, { username, password }) {
            return new Promise((resolve, reject) => {
                request.post('/login', {
                    username, password
                }).then(res => {
                    context.commit('SET_ADMINTOKEN', res.data.data.token)
                    return request.get('/auth/info')
                }).then(res => {
                    context.commit('SET_ADMININFO', res.data.data.admin)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout ({ commit }) {
            //直接清除token
            commit('SET_ADMINTOKEN', '')
            storageService.set(storageService.ADMIN_TOKEN, '')
            // 清除用户信息
            commit('SET_ADMININFO', '')
            storageService.set(storageService.ADMIN_INFO, '')

        }
    }
}

export default adminModule;
