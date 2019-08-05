<template>
  <div class="join-team">
    <account-group-icon style="font-size: 3.2em"></account-group-icon>
    <h1>Join a team</h1>
    <p>
      Your account hasn't been added to a Sunfile team yet. If you've been given
      access to Sunfile and have received a Team Code, enter it here.
    </p>
    <b-input
      :state="validation"
      size="lg"
      class="joinTeamInput"
      v-model="teamCode"
      type="text"
      placeholder="Team Code"
    ></b-input>
    <b-form-invalid-feedback class="joinTeamFeedback" :state="validation">
      A team code is exactly six characters long.
    </b-form-invalid-feedback>
    <b-button
      :disabled="submitDisabled"
      class="joinTeamSubmit"
      type="submit"
      variant="primary"
      size="lg"
      v-on:click="joinTeam"
    >
      <b-spinner v-if="loading"></b-spinner>
      <span v-else> Join </span>
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import AccountGroupIcon from "vue-material-design-icons/account-group.vue";

import TeamService from "@/services/teamService";

@Component({
  components: {
    "account-group-icon": AccountGroupIcon
  }
})
export default class JoinTeam extends Vue {
  @Action showError: any;
  @Action setTeamCode: any;
  teamCode: string = "";
  loading = false;

  get validation() {
    return this.teamCode.length === 6;
  }

  get submitDisabled() {
    return !this.validation || this.loading;
  }

  async joinTeam() {
    try {
      this.loading = true;
      const team = await TeamService.joinTeam(this.teamCode);

      if (!team) {
        this.showError("That team doesn't seem to exist!");
      } else {
        this.setTeamCode(team.teamCode);
        this.$router.push("/");
      }
    } catch (e) {
      this.showError("Something went wrong. Try that again.");
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.joinTeamFeedback {
  text-align: left;
}

.joinTeamSubmit {
  margin-top: 0.75em;
}
</style>
