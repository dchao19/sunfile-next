<template>
  <div id="nav">
    <b-nav pills fill>
      <b-nav-item active-class="active" :to="{ name: 'portal' }" exact
        >Overview</b-nav-item
      >
      <b-nav-item active-class="active" :to="{ name: 'members' }" exact
        >Team</b-nav-item
      >
      <b-nav-item active-class="active" :to="{ name: 'table' }" exact
        >Source Table</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavigationBar extends Vue {}
</script>

<style scoped>
#nav {
  margin-bottom: 0.75em;
}
</style>
