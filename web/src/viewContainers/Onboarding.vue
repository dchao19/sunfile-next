<template>
  <div class="onboarding">
    <Header/>
    <div class="content">
      <ErrorBoundary>
        <router-view></router-view>
      </ErrorBoundary>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

@Component({
    components: {
        Header,
        ErrorBoundary
    }
})
export default class Onboarding extends Vue {}
</script>

<style>
.onboarding {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
}

.content {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>