<template>
	<div>
		<b-alert :show="error" dismissible @dismissed="dismiss">{{errorMessage}}</b-alert>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class ErrorBoundary extends Vue {
	@Action hideError: any;
	@Action showError: any;

	get error(): boolean {
		return this.$store.state.error.visible as boolean;
	}

	get errorMessage(): string {
		return this.$store.state.error.message as string;
	}

	errorCaptured(e: Error) {
		this.showError(e.message);
	}

	dismiss() {
		this.hideError();
	}
}
</script>
