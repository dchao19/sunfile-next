import Vue from "vue";
import Vuex from "vuex";

import { error } from "@/store/modules/error";
import { teamCode } from "@/store/modules/teamCode";
import { article } from "@/store/modules/article";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    error,
    teamCode,
    article
  }
});
