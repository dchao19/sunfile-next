<template>
    <div id="nav">
        <b-nav pills>
            <b-nav-item active-class="active" to="/" exact>Home</b-nav-item>
        </b-nav>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavigationBar extends Vue {}
</script>

