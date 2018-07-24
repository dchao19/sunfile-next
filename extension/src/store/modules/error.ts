import { ERROR_SHOW, ERROR_HIDE } from "@/store/mutationTypes";
import { ActionContext } from "vuex";

export interface IErrorState {
	visible: boolean;
	message: string;
}

export const error = {
	state: {
		visible: false,
		message: ""
	},

	mutations: {
		[ERROR_SHOW](state: IErrorState, payload: { message: string }): void {
			state.message = payload.message;
			state.visible = true;
		},

		[ERROR_HIDE](state: IErrorState): void {
			state.message = "";
			state.visible = false;
		}
	},

	actions: {
		showError({ commit }: ActionContext<IErrorState, {}>, message: string) {
			commit(ERROR_SHOW, { message });
		},

		hideError({ commit }: ActionContext<IErrorState, {}>) {
			commit(ERROR_HIDE);
		}
	}
};
