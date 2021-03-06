// 本地缓存服务, 存放cookie

const PREFIX = 'my_project';

// user模块
const USER_PREFIX = `${PREFIX}user_`;
const USER_TOKEN = `${USER_PREFIX}token`;
const USER_INFO = `${USER_PREFIX}info`;


// admin
const ADMIN_PREFIX = `${PREFIX}admin_`;
const ADMIN_TOKEN = `${ADMIN_PREFIX}token`;
const ADMIN_INFO = `${ADMIN_PREFIX}info`;


// 储存
const set = (key, data) => {
    localStorage.setItem(key, data)
};

// 读取
const get = (key) => localStorage.getItem(key);

export default {
    set,
    get,
    USER_TOKEN,
    USER_INFO,
    ADMIN_TOKEN,
    ADMIN_INFO
};