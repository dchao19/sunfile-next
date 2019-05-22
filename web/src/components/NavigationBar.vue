<template>
  <div id="nav">
    <b-nav>
      <b-nav-item active-class="underline" :to:"{ name: 'overview' }">Home</b-nav-item>
      <b-nav-item active-class="underline" :to:"{ name: 'team' }">Team</b-nav-item>
      <b-nav-item active-class="underline" :to:"{ name: 'filing' }">Filing</b-nav-item>
    </b-nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue";

@Component
export default class NavigationBar extends Vue {}
</script>

<style scoped>
.underline {
  border-bottom: 0.5em solid white;
}
</style>
