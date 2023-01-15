import { createRouter, createWebHistory } from "vue-router";
const Layout = () => import("@/views/layout/index.vue")
const Home = () => import("@/views/home/index.vue");
const Sites = () => import("@/views/sites/index.vue");
const SiteDetail = () => import("@/views/sites/detail.vue");
const Welcome = () => import("@/views/home/welcome.vue")

const Login = () => import("@/views/login/index.vue")
const Register = () => import("@/views/register/index.vue")

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
            },
            {
              path: "/sites/:id",
              name: "Sites",
              component: Sites,
            },
            {
              path: "/sites/:id/detail",
              name: "SiteDetail",
              component: SiteDetail,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ],
});


router.beforeEach((to, from, next) => {
  
  document.title = to.meta.title
  next()
})
export default router;
