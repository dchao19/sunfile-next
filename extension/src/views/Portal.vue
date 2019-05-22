<template>
  <div class="main">
    <Greeter/>
    <FileButton/>
    <hr/>
    <NavigationBar/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationBar from "@/components/NavigationBar.vue";
import Greeter from "@/components/Greeter.vue";
import FileButton from "@/components/FileButton.vue";

@Component({
  components: {
    NavigationBar,
    Greeter,
    FileButton
  }
})
export default class Portal extends Vue {}
</script>
