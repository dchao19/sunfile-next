<template>
<h1>Loading...</h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/services/authService";

@Component
export default class ImplicitCallback extends Vue {
	async beforeMount() {
		await AuthService.handleAuthentication();

		this.$router.push("/checkteam");
	}
}
</script>
