<template>
  <div class="overview">
    <b-spinner v-if="loading"></b-spinner>
    <div v-else class="stats">
      <Panel class="teamInfo">
        <template v-slot:left>
          <ul class="unstyled">
            <li>
              <strong>Team Name</strong>
            </li>
            <li>{{name}}</li>
          </ul>
        </template>
        <template v-slot:right>
          <ul class="unstyled rightAlign">
            <li>
              <strong>Team Code</strong>
            </li>
            <li>{{teamCode}}</li>
          </ul>
        </template>
      </Panel>
      <Panel class="userArticles">
        <template v-slot:left>
          <div>
            <strong>My articles this season</strong>
          </div>
        </template>
        <template v-slot:right>{{userCount}} articles</template>
      </Panel>
      <Panel class="teamArticles">
        <template v-slot:left>
          <div>
            <strong>Team articles this season</strong>
          </div>
        </template>
        <template v-slot:right>{{teamCount}} articles</template>
      </Panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import Panel from "@/components/Panel.vue";
import TeamService from "@/services/teamService";

@Component({
  components: {
    Panel
  }
})
export default class Overview extends Vue {
  @Action showError!: (errorMessage: string) => void;

  name: string = "";
  teamCode: string = "";
  userCount: number = 0;
  teamCount: number = 0;
  loading: boolean = true;

  async mounted() {
    try {
      const teamOverview = await TeamService.getTeamOverview(
        this.$store.state.teamCode.teamCode
      );

      if (!teamOverview) {
        throw "Team data was missing!";
      }

      const { name, teamCode, userCount, teamCount } = teamOverview;

      this.name = name;
      this.teamCode = teamCode;
      this.userCount = userCount;
      this.teamCount = teamCount;
    } catch (e) {
      this.showError("An error occurred!");
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.unstyled {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.rightAlign {
  text-align: right;
}

.teamInfo {
  margin-bottom: 15px;
}

.userArticles {
  margin-bottom: 15px;
}
</style>
