<template>
  <div class="articleChart">
    <h1>Article Chart - {{ type }} Page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ArticleChart extends Vue {
  get type() {
    return this.$route.params.type;
  }
}
</script>
