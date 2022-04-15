import storageService from '@/request/storageService'

const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null,

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


    },
    actions: {
        logout ({ commit }) {
            //直接清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN, '')
            // 清除用户信息
            commit('SET_USERINFO', '')
            storageService.set(storageService.USER_INFO, '')

        }
    }
}

export default userModule;
