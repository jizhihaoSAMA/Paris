import axios from 'axios'
import storageService from './storageService';
import store from '@/store'
import Vue from 'vue';
import router from '../router';

const service = axios.create({
    baseURL: 'http://localhost:8081/admin/',
    timeout: 1000 * 5,
});


// 使 每次 登录的时候都是最新的token
service.interceptors.request.use((config) => {
    // 为请求头赋值，传一个对象
    Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.ADMIN_TOKEN)}` });
    return config;
}, error => {
    return Promise.reject(error);
});

service.interceptors.response.use((response) => {
    return Promise.resolve(response)

}, error => {
    if (error.response.status == 401) {
        new Vue().$bvToast.toast(
            "登录信息过期，请重新登录", { title: "提醒", variant: "danger" }
        )
        setTimeout(() => {
            store.dispatch('adminModule/logout')
            router.push("/admin/login")
        }, 1500)
    }
    return Promise.reject(error.response)
});

export default service;
