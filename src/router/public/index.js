const publicRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/public/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/public/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/public/Register.vue')
  },
  {
    path: '/index/',
    name: 'index',
    component: () => import('@/views/public/Index.vue'),
    children: [
      {
        path: 'house',
        component: () => import('@/components/HouseFrame.vue'),
        children: [
          {
            path: 'detail/:house_id',
            name: 'detail',
            component: () => import('@/components/HouseDetail.vue'),
          },
          {
            path: '',
            name: 'list_group',
            component: () => import('@/components/ListGroup.vue'),
          },
        ],
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/public/MapSearchHouse.vue'),
      },
      {
        path: 'hot',
        name: 'hot',
        component: () => import("@/views/public/HotHouse.vue")
      }
    ],
  },
]

export default publicRoutes
