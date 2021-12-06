const publicRoutes = [{
    path: '/',
    name: 'home',
    component: () => import("@/views/public/Home.vue"),
}, {
    path: '/index/:type',
    name: 'index',
    component: () => import("@/views/public/Index.vue")
}, {
    path: '/detail/:house_id',
    name: 'detail',
    component: () => import("@/views/public/Detail.vue")
}]

export default publicRoutes