const publicRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/public/Home.vue'),
  },
  {
    path: '/index/',
    name: 'index',
    component: () => import('@/views/public/Index.vue'),
    children: [
      {
        path: 'house',
        name: 'house',
        component: () => import('@/components/HouseFrame.vue'),
      },
      {
        path: 'office',
        name: 'office',
        component: () => import('@/components/OfficeFrame.vue'),
      },
    ],
  },
  {
    path: '/detail/:house_id',
    name: 'detail',
    component: () => import('@/components/HouseDetail.vue'),
  },
]

export default publicRoutes
