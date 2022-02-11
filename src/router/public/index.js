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
        children: [
          {
            path: '/detail/:house_id',
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
    ],
  },
]

export default publicRoutes
