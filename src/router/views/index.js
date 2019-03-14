import Layout from '@/page/index/'

export default [
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () =>
        import ('@/views/wel/index'),
    }]
  }
 ]
