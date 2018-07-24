import Vue from "vue";
import Vuex from "vuex";

import { error } from "@/store/modules/error";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		error
	}
});
