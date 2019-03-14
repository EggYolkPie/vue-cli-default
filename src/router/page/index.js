import Layout from '@/page/index/'

export default [{
  path: '/',
  redirect: 'wel',
  hidden: true
}, {
  path: '/login',
  name: '登录页',
  component: () =>
    import ('@/page/login/index'),
  meta: {
    keepAlive: true,
  }
},
  {
    path: '/lock',
    name: '锁屏页',
    component: () =>
      import ('@/page/lock/index'),
  },

]
