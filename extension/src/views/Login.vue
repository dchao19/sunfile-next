<template>
  <div class="login">
    <h1>Login</h1>
    <p>You'll need to login to continue with Sunfile. This will open in a new window, and you'll need to open Sunfile again when you're all done</p>
    <b-button v-on:click="loginClick" size="lg" variant="primary">Login to Sunfile</b-button>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Auth from "@/utils/authService";

@Component
export default class Login extends Vue {
    loginClick() {
        Auth.login();
    }
}
</script>

<style scoped>
.login {
    padding-bottom: 10px;
}
</style>
