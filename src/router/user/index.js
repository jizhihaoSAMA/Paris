const userRoutes = [{
    path: '/profile',
    name: 'profile',
    meta: {
        required_auth: true,
    },
    component: () => import("@/views/user/Profile"),
}, {
    path: '/postHouse',
    name: 'postHouse',
    meta: {
        required_auth: true,
    },
    component: () => import("@/views/user/PostHouse.vue")
}]

export default userRoutes