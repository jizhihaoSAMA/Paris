import storageService from '@/request/storageService'
import request from '@/request/request'

const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null,
        unreadAmount: 0,
    },
    mutations: {
        SET_TOKEN (state, token) {
            // 更新本地缓存
            storageService.set(storageService.USER_TOKEN, token);
            // 更新state
            state.token = token;
        },
        SET_USERINFO (state, userInfo) {
            // 更新缓存
            storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
            // 更新state
            state.userInfo = userInfo;
        },
        SET_UNREAD_AMOUNT (state, amount) {
            state.unreadAmount = amount
        }

    },
    actions: {
        login (context, { username, password }) {
            return new Promise((resolve, reject) => {
                request.post('/login', {
                    username, password
                }).then(res => {
                    context.commit('SET_TOKEN', res.data.data.token)
                    return request.get('/auth/info')
                }).then(res => {
                    context.commit('SET_USERINFO', res.data.data.user)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout ({ commit }) {
            //直接清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN, '')
            // 清除用户信息
            commit('SET_USERINFO', '')
            storageService.set(storageService.USER_INFO, '')

        },
        getUnreadAmount ({ commit }) {
            return new Promise((resolve, reject) => {
                request.get("/noticeUnread").then(res => {
                    commit('SET_UNREAD_AMOUNT', res.data.data.unread_amount)
                    resolve(res)
                }).catch(err => {
                    commit('SET_UNREAD_AMOUNT', 0)
                    reject(err)
                })
            })
        }
    }
}

export default userModule;
