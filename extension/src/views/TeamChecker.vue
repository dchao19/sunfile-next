<template>
  <div class="teamChecker">
    <b-spinner/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import TeamService from "@/services/teamService";

@Component
export default class TeamChecker extends Vue {
  @Action showError: any;
  @Action setTeamCode: any;

  async mounted() {
    try {
      const team = await TeamService.userTeam();

      if (team) {
        this.setTeamCode(team.teamCode);
        this.$router.push({ name: "portal" });
      } else {
        this.$router.push({ name: "join" });
      }
    } catch (e) {
      this.showError("Something went wrong! Try opening Sunfile again.");
    }
  }
}
</script>

