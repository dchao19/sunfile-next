<template>
  <div class="teamMembers">
    <b-spinner v-if="loading"></b-spinner>
    <ul class="teamMemberList">
      <li v-if="teamMembers.length === 0 && !loading">
        <Panel>
          <template v-slot:left
            >There aren't any team members yet!</template
          >
        </Panel>
      </li>
      <li v-for="member in teamMembers" v-bind:key="member.id">
        <Panel class="teamMemberPanel">
          <template v-slot:left>
            <strong>{{ member.name }}</strong>
          </template>
          <template v-slot:right
            >{{ member.numArticles }} articles</template
          >
        </Panel>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import { TeamMember } from "@/types";
import TeamService from "@/services/teamService";
import Panel from "@/components/Panel.vue";

@Component({
  components: {
    Panel
  }
})
export default class TeamMembers extends Vue {
  @Action showError: any;

  loading: boolean = true;
  teamMembers: TeamMember[] = [];

  async mounted() {
    try {
      const members = await TeamService.getTeamMembers(
        this.$store.state.teamCode.teamCode
      );

      if (members.length === 0) {
        throw new Error();
      }

      this.teamMembers = members;
    } catch (e) {
      this.showError("An error occurred!");
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.teamMemberList {
  list-style: none;
  padding-left: 0;
}

.teamMemberPanel {
  margin-bottom: 15px;
}
</style>
