import axios from 'axios'
import storageService from './storageService';

const service = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 1000 * 5,
});


// 使 每次 登录的时候都是最新的token
service.interceptors.request.use((config) => {
    // 为请求头赋值，传一个对象
    Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` });
    return config;
}, error => {
    return Promise.reject(error);
});

export default service;
