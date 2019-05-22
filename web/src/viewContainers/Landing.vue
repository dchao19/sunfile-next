<template>
  <div class="landingContainer">
    <Header>
      <div class="headerContainer">
        <h1 class="headerText">sunfile.</h1>
      </div>
    </Header>

    <div class="mainLanding">
      <div class="sideText">
        <h2 class="jokeText">Unprepared with Prepd?</h2>
        <h2 class="jokeText">Out of wishes with Extemp Genie?</h2>
        <br>
        <p>
          <strong>Sunfile</strong> gets out of your way. Stay organized, file on the go, and track your team, all without the pain.
        </p>
      </div>
      <div class="entrypoint">
        <b-card>
          <h2 class="jokeText">Let's get started.</h2>
          <b-button variant="primary" block>Log in or sign up</b-button>
          <hr>
          <a href="https://chrome.google.com/webstore/detail/ljhciodenpkegapaikengdbcglopgome/"><img src="../assets/chrome-badge.png"></a>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class Landing extends Vue {}
</script>

<style>
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

.mainLanding {
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 85%;
  align-self: center;
  justify-content: center;
  align-items: center;
}

.sideText {
  text-align: left;
}

.jokeText {
  font-weight: bold;
}

.landingContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.entrypoint {
  margin-left: 5em;
  text-align: left;
}

html,
body {
  height: 100%;
}
</style>