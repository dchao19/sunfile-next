import Vue from "vue";
import Router from "vue-router";

import Portal from "@/views/Portal.vue";
import Login from "./views/Login.vue";
import ImplicitCallback from "@/views/ImplicitCallback.vue";
import JoinTeam from "@/views/JoinTeam.vue";
import TeamChecker from "@/views/TeamChecker.vue";
import TeamMembers from "@/views/TeamMembers.vue";
import ArticleChart from "@/views/ArticleChart.vue";
import SourceChart from "@/views/SourceChart.vue";
import SourceTable from "@/views/SourceTable.vue";
import Overview from "@/views/Overview.vue";

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
          path: "articles/:type",
          name: "articles",
          component: ArticleChart
        },
        {
          path: "sources/:type",
          name: "sources",
          component: SourceChart
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
