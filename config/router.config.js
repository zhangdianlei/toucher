export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './welcome/index', title: '首页' },
      { path: '/category', component: './category/index', title: '分类' },
      { path: '/login', component: './login/index', title: '登录' },
      { path: '/test', component: './test/index', title: '测试页面' },
      { path: '/toucherList', component: './toucherList/index', title: '我的触达号' },
      { path: '/toucherManage', component: './toucherManage/index', title: '触达号管理' },
      { path: '/preview', component: './preview/index', title: '预览' },

      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          { path: '/exception/403', title: '无权限', component: './exception/403' },
          { path: '/exception/500', title: '服务器出错了', component: './exception/500' },
        ],
      },
      { component: '404', title: '页面没找到' },
    ],
  },
];
