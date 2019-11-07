import Layout from '@/page/index/';

export default [
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () =>
        import ('@/page/wel'),
    }]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/index',
    children: [{
      path: 'index',
      name: '柱状图',
      component: () =>
        import ( /* webpackChunkName: "utils" */ '@/views/echarts/index')
    }]
  },

];
