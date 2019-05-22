import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "landing",
            component: () =>
                import(
                    /* webpackChunkName: "landing" */ "@/viewContainers/Landing.vue"
                )
        },
        {
            path: "/implicit/callback",
            name: "callback",
            component: () =>
                import(
                    /* webpackChunkName: "Callback" */ "@/views/ImplicitCallback.vue"
                )
        },
        {
            path: "/onboarding",
            component: () =>
                import(
                    /* webpackChunkName: "onboarding"*/ "@/viewContainers/Onboarding.vue"
                ),
            children: [
                {
                    path: "checkteam",
                    name: "checkteam",
                    component: () =>
                        import(
                            /*webpackChunkName: "checkteam"*/ "@/views/CheckTeam.vue"
                        )
                },
                {
                    path: "join",
                    name: "join",
                    component: () =>
                        import(
                            /*webpackChunkName: "join"*/ "@/views/JoinTeam.vue"
                        )
                }
            ]
        },
        {
            path: "/home",
            component: () =>
                import(
                    /* webpackChunkName: "home" */ "@/viewContainers/Home.vue"
                ),
            children: [
                {
                    path: "",
                    name: "overview",
                    component: () =>
                        import(
                            /* webpackChunkName: "overview" */ "@/views/Overview.vue"
                        )
                },
                {
                    path: "team",
                    name: "team",
                    component: () =>
                        import(
                            /* webpackChunkName: "overview" */ "@/views/TeamMembers.vue"
                        )
                },
                {
                    path: "filing",
                    name: "filing",
                    component: () =>
                        import(
                            /* webpackChunkName: "overview" */ "@/views/Filing.vue"
                        )
                }
            ]
        }
    ]
});
