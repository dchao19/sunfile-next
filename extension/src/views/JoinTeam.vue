<template>
    <div class="join-team">
        <account-group-icon style="font-size: 3.2em"></account-group-icon>
        <h1> Join a team </h1>
        <p> Your account hasn't been added to a Sunfile team yet. If you've been given access to Sunfile and have received a Team Code, enter it here. </p>
        <b-form-input size="lg" class="joinTeamInput" v-model="teamCode" type="text" placeholder="Team Code"></b-form-input>
        <b-button variant="primary" size="lg" v-on:click="joinTeam">Join</b-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountGroupIcon from "vue-material-design-icons/account-group.vue";

@Component({
	components: {
		"account-group-icon": AccountGroupIcon
	}
})
export default class JoinTeam extends Vue {
	teamCode: string = "";
	joinTeam() {
		//TODO: make the API call
	}
}
</script>

<style scoped>
.joinTeamInput {
	margin-bottom: 0.75em;
	text-align: center;
}
</style>
