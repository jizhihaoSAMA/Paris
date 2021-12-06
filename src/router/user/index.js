const userRoutes = [{
    path: '/profile',
    name: 'profile',
    meta: {
        required_auth: true,
    },
    components: () => import("@/views/user/Profile"),
}]

export default userRoutes