<template>
  <div class="home">
    <NavigationBar/>
    <img src="../assets/logo.png">
    <button v-on:click='clickLogin' id='login-button'>Login</button>
    <button v-on:click='clickLogin2' id='login-button'>Login 2 </button>
    <HelloWorld msg="Hello"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import NavigationBar from "@/components/NavigationBar.vue";
import Auth from "@/utils/authService";

@Component({
    components: {
        HelloWorld,
        NavigationBar
    }
})
export default class Home extends Vue {
    clickLogin() {
        Auth.login();
    }

    clickLogin2() {
        // (this as any).$auth.loginRedirect("/");
    }
}
</script>
