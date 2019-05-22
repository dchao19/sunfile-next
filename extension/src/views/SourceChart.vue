<template>
  <div class="sourceChart">
    <h1>Source Chart - {{ type }} Page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SourceChart extends Vue {
  get type() {
    return this.$route.params.type;
  }
}
</script>
