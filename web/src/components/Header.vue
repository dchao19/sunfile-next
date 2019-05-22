<template>
  <div class="headerContainer">
      <slot></slot>
      <h1 class="headerText">sunfile.</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

export default class Header extends Vue {}
</script>

<style>
.header-image {
  background-image: url("../assets/header-image.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  resize: both;
}

.headerText {
  font-size: 10em;
  color: white;
  margin: 0.5em;
}

.headerContainer {
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(147, 112, 219, 0.75);
}

</style>
