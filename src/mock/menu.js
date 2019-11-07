import {
  baseUrl
} from '@/config/env'
const first = [{
  id: 1,
  label: "echarts集合",
  icon: 'icon-biaoge',
  children: [
    {
      id: 11,
      label: "柱状图",
      href: '/echarts/index',
      // query: {//传递参数使用
      //   a: 1
      // },
      icon: 'anticon anticon-bar-chart',
      meta: {},
      children: []
    }
  ],
}, ]
const second = []
export const menu = [first, second];
