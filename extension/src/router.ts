import Vue from "vue";
import Router from "vue-router";

import Portal from "@/views/portal/Portal.vue";
import Login from "@/views/auth/Login.vue";
import ImplicitCallback from "@/views/auth/ImplicitCallback.vue";
import JoinTeam from "@/views/onboarding/JoinTeam.vue";
import TeamChecker from "@/views/onboarding/TeamChecker.vue";
import TeamMembers from "@/views/portal/TeamMembers.vue";
import SourceTable from "@/views/portal/SourceTable.vue";
import Overview from "@/views/portal/Overview.vue";

import AuthService from "@/services/authService";
import { isExtension } from "@/utils/isExtension";

Vue.use(Router);

const router = new Router({
  mode: isExtension() ? "hash" : "history",
  routes: [
    {
      path: "/",
      redirect: { name: "checkteam" }
    },
    {
      path: "/portal",
      component: Portal,
      children: [
        {
          path: "",
          name: "portal",
          component: Overview
        },
        {
          path: "members",
          name: "members",
          component: TeamMembers
        },
        {
          path: "table",
          name: "table",
          component: SourceTable
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/join",
      name: "join",
      component: JoinTeam
    },
    {
      path: "/implicit/callback",
      name: "callback",
      component: ImplicitCallback
    },
    {
      path: "/checkteam",
      name: "checkteam",
      component: TeamChecker,
      beforeEnter: AuthService.authRequired
    }
  ]
});

export default router;
