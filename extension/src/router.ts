import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import AuthService from "./utils/authService";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            beforeEnter: AuthService.authRequired
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }
    ]
});

export default router;
