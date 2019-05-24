<template>
  <div id="nav">
    <b-nav>
      <b-nav-item active-class="underline" exact :to="{ name: 'overview' }">Home</b-nav-item>
      <b-nav-item active-class="underline" exact :to="{ name: 'team' }">Team</b-nav-item>
      <b-nav-item active-class="underline" exact :to="{ name: 'extractionStep' }">Filing</b-nav-item>
    </b-nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NavigationBar extends Vue {}
</script>

<style scoped>
.underline {
  border-bottom: 0.25em solid darkmagenta;
}

.nav-link {
  color: white;
}

</style>
