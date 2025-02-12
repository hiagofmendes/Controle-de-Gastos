import ErrorNotFound from "src/pages/ErrorNotFound.vue";
import HomePage from "src/pages/HomePage.vue";
import LoginPage from "src/pages/LoginPage.vue";
import UserRegister from "src/pages/UserRegister.vue";
import { createRouter, createWebHistory } from "vue-router";
import FormPage from "src/pages/FormPage.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/cadastro",
    component: UserRegister,
    // component: () => import("app/src/pages/UserRegister.vue"),
    name: "cadaster",
    meta: { requiresAuth: true },
    // children: [{ path: "", component: () => import("pages/UserRegister.vue") }],
  },
  {
    path: "/home",
    component: HomePage,
    name: "home",
    meta: { requiresAuth: true },
    // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/formulario",
    component: FormPage,
    name: "Formulario",
    meta: { requiresAuth: true },
    // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // defina essa rota sempre em último
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFound,
  },
];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// TRATAR ROTAS SEGURAS

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const token = localStorage.getItem("token");
//   console.log(token);
//   const validToken = verifyToken(token);
//   if (requiresAuth) {
//     if (validToken) {
//       next();
//     } else {
//       next("/");
//     }
//   } else {
//     next("/");
//   }
// });
// async function verifyToken(token: string): Promise<boolean> {
//   console.log("estou aqui");
//   if (!token) {
//     return false;
//   }
//   if (token) {
//     const decodedToken = JSON.parse(atob(token.split(".")[1]));
//     const expirationTime = decodedToken.exp;
//     const currentTime = Math.floor(Date.now() / 1000);

//     return expirationTime > currentTime;
//   }
// }

export default routes;
