<template>
  <div class="home">
    <NavigationBar/>
    <img src="../assets/logo.png">
    <button v-on:click='clickLogin' id='login-button'>Login</button>
    <button v-on:click='throwError' id='login-button'>Login 2 </button>
    <HelloWorld msg="Hello"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import NavigationBar from "@/components/NavigationBar.vue";

import Auth from "@/services/authService";

@Component({
	components: {
		HelloWorld,
		NavigationBar
	}
})
export default class Home extends Vue {
	@Action showError: any;

	clickLogin() {
		Auth.login();
	}

	throwError() {
		// throw new Error("AHHHHHH");
		// (this as any).$auth.loginRedirect("/");
		this.showError("AHHHH");
	}
}
</script>
