<template>
    <div id="app">
        <b-container fluid>
			<transition>
            	<router-view/>
			</transition>
        </b-container>
    </div>
</template>

<style>
#app {
  font-family: "Rubik", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 400px;
  padding: 20px 20px 20px 20px;
}
</style>
