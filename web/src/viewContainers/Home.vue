<template>
  <div class="home">
    <Header>
        <NavigationBar/>
    </Header>
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
import NavigationBar from "@/components/NavigationBar.vue"

@Component({
    components: {
        Header,
        ErrorBoundary,
        NavigationBar
    }
})
export default class Onboarding extends Vue {}
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.content {
    height: 85%;
}
</style>