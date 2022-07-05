const adminRoutes = [
    {
        path: '/admin/',
        name: 'admin',
        component: () => import('@/views/admin/Index.vue'),
        meta: {
            required_admin: true,
            admin: true
        },
    },
    {
        path: '/admin/login',
        component: () => import('@/views/public/Login.vue'),
        meta: {
            admin: true,
        }
    },
]

export default adminRoutes
