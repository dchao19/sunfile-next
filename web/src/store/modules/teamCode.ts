import { TEAM_CODE_SET } from "@/store/mutationTypes";
import { ActionContext, Action } from "vuex";

export interface ITeamCodeState {
  teamCode: string;
}

export const teamCode = {
  state: {
    teamCode: ""
  },

  mutations: {
    [TEAM_CODE_SET](
      state: ITeamCodeState,
      payload: { teamCode: string }
    ): void {
      state.teamCode = payload.teamCode;
    }
  },

  actions: {
    setTeamCode(
      { commit }: ActionContext<ITeamCodeState, {}>,
      teamCode: string
    ) {
      commit(TEAM_CODE_SET, { teamCode });
    }
  }
};
