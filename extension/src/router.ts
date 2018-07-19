import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import ImplicitCallback from "@/views/ImplicitCallback.vue";

import AuthService from "./utils/authService";
import { isExtension } from "@/utils/isExtension";

Vue.use(Router);

const router = new Router({
	mode: isExtension() ? "hash" : "history",
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
		},
		{
			path: "/implicit/callback",
			name: "callback",
			component: ImplicitCallback
		}
	]
});

export default router;
