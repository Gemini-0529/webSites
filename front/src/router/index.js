import { createRouter, createWebHistory } from "vue-router";
const Layout = () => import("@/views/layout/index.vue")
const Home = () => import("@/views/home/index.vue");
const Sites = () => import("@/views/sites/index.vue");
const Welcome = () => import("@/views/home/welcome.vue")

const Login = () => import("@/views/login/index.vue")
const Register = () => import("@/views/register/index.vue")

const UserInfo = () => import("@/views/header/components/userInfo.vue")
const History = () => import("@/views/history/index.vue")

const NotFound = () => import("@/views/404/404.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: Layout,
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
          redirect: '/welcome',
          children: [
            {
              path: '/welcome',
              name: 'Welcome',
              component: Welcome,
              meta: {
                title: '欢迎'
              }
            },
            {
              path: "/sites/:id",
              name: "Sites",
              component: Sites,
              meta: {
                title: '网站'
              }
            },
            {
              path: '/userInfo',
              name: 'userInfo',
              component: UserInfo,
              meta: {
                title: '用户信息'
              }
            },
             {
              path: '/history',
              name: 'history',
              component: History,
              meta: {
                title: '浏览记录'
              }
             }
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: NotFound,
      meta: {
        title: 'Not Found'
      }
    }
  ],
});
router.beforeEach((to, from, next) => {
  
  document.title = to.meta.title
  next()
})
export default router;
