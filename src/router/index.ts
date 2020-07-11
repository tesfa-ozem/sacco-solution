import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Auth/Login.vue";
import SignUp from "@/views/Auth/SignUp.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      requiresAuth: true
    },
    component: Home
  },
  {
    path: "/about",
    name: "About",
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/calculator",
    name: "Calculator",
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Calculator.vue")
  },
  {
    path: "/services",
    name: "service",
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Services.vue")
  },
  {
    path: "/transaction",
    name: "Transaction",
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Transaction.vue")
  },

  {
    path: "/error",
    name: "Error",
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ErrorPage.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SignUp
  },
  {
    path: "/waiting",
    name: "Waiting",
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Auth/Waiting.vue")
  }
];

const router = new VueRouter({
  routes
});
// router.beforeEach((to, from, next) => {
//     const stage = store.state.user?.data?.state
//     if(stage =='verification'){
//         next({name:'Waiting'})
//     }else{
//         next()
//     }

// })
router.onError(error => {
  console.log(error);
});
router.beforeEach((to, from, next) => {
  const stage = store.state.user?.data?.data_type;
  const state = store.state.user?.data?.state == "verification";
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    console.log(requiresAuth);
    if (stage == "member_application") {
      console.log("not member");
      if (state) {
        next("/waiting");
      } else {
        next("/signup");
      }
    } else if (stage == "member") {
      console.log("member");
      next();
    }
  } else {
    next();
  }
});

export default router;
