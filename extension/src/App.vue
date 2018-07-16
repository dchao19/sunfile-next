<template>
    <div id="app">
        <b-container fluid>
            <router-view/>
        </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationBar from "@/components/NavigationBar.vue";

@Component
export default class App extends Vue {}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 400px;
}
</style>
