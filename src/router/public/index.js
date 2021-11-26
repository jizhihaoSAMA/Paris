const publicRoutes = [{
    path: '/',
    name: 'home',
    component: () => import("@/views/public/Home.vue"),
}]

export default publicRoutes