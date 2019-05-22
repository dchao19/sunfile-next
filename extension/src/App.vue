<template>
    <div id="app">
        <b-container fluid>
            <ErrorBoundary>
                <transition>
                    <router-view/>
                </transition>
            </ErrorBoundary>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

@Component({
	components: {
		ErrorBoundary
	}
})
export default class App extends Vue {}
</script>

<style>
#app {
	font-family: "Rubik", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 425px;
	padding-top: 15px;
	padding-bottom: 15px;
}
</style>
