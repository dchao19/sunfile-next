<template>
  <div class="overview">
    <b-spinner v-if="loading"></b-spinner>
    <div v-else>
        <h1 class="greeter">hello, {{ userName }}</h1>
        <div class="stats">
            <b-card class="unstyled statCard">
                <li><h2><b-badge variant="success">{{ userCount }}</b-badge></h2></li>
                My articles this season
            </b-card>
            <b-card class="unstyled statCard">
                <b-card-body class="centered">
                <h3>{{ name }}</h3>
                </b-card-body>
            </b-card>
            <b-card  class="unstyled statCard">
                <li><h2><b-badge variant="success">{{ teamCount }}</b-badge></h2></li>
                Team articles this season
            </b-card>
        </div>
        <hr/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

// import Greeter from "@/components/Greeter1.vue";
import TeamService from "@/services/teamService";
import AuthService from "@/services/authService";

@Component({
    components: {
        // Greeter
    }
})
export default class Overview extends Vue {
  @Action showError!: (errorMessage: string) => void;

  name: string = "";
  teamCode: string = "";
  userCount: number = 0;
  teamCount: number = 0;
  loading: boolean = true;
  userName: string = "";

  async beforeMount() {
      this.userName = (await AuthService.name()).split(" ")[0]
  }
  

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

.stats {
    flex-direction: row;
    display: flex;
}

.statCard + .statCard {
    margin-left: 15px;
}

.statCard {
    display: flex;
    align-items: center;
    justify-content: center;
}

.centered {
    align-items: center;
    justify-content: center;
}

.greeter {
    margin-bottom: 20px;
}
</style>
