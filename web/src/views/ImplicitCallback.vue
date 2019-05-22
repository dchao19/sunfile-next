<template>
    <div class="fill">
        <b-spinner/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/services/authService";

@Component
export default class ImplicitCallback extends Vue {
	async beforeMount() {
		await AuthService.handleAuthentication();

		this.$router.push("home");
	}
}
</script>


<style scoped>
.fill {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
