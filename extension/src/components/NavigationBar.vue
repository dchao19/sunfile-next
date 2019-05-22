<template>
  <div id="nav">
    <b-nav pills fill>
      <b-nav-item active-class="active" :to="{ name: 'portal' }" exact
        >Me</b-nav-item
      >
      <b-nav-item active-class="active" :to="{ name: 'members' }" exact
        >Team</b-nav-item
      >
      <b-nav-item-dropdown active-class="active" text="Articles" right>
        <b-dropdown-item
          active-class="active"
          :to="{ name: 'articles', params: { type: 'my' } }"
          exact
          >My Articles</b-dropdown-item
        >
        <b-dropdown-item
          active-class="active"
          :to="{ name: 'articles', params: { type: 'team' } }"
          exact
          >Team Articles</b-dropdown-item
        >
      </b-nav-item-dropdown>
      <b-nav-item-dropdown active-class="active" text="Sources" right>
        <b-dropdown-item
          active-class="active"
          :to="{ name: 'sources', params: { type: 'my' } }"
          exact
          >My Sources</b-dropdown-item
        >
        <b-dropdown-item
          active-class="active"
          :to="{ name: 'sources', params: { type: 'team' } }"
          exact
          >Team Sources</b-dropdown-item
        >
        <b-dropdown-item active-class="active" :to="{ name: 'table' }"
          >Source Table</b-dropdown-item
        >
      </b-nav-item-dropdown>
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
