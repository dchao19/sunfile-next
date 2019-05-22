<template>
  <div class="headerContainer">
      <h1 class="headerText">sunfile.</h1>
      <slot></slot>
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
  font-size: 9em;
  color: white;
  margin: 0.25em;
}

.headerContainer {
  height: 40%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(147, 112, 219, 0.75);
  flex-direction: column;
}

</style>
