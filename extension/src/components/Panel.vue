<template>
    <b-card class="panel-container" no-body>
        <b-card-body class="panel-body">
            <div class="panel-left">
                <slot name="left"></slot>
            </div>
            <div class="spacer"></div>
            <div class="panel-right">
                <slot name="right"></slot>
            </div>
        </b-card-body>
    </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Panel extends Vue {}
</script>

<style scoped>
.panel-container {
    display: flex;
    flex-direction: row;
}
.panel-body {
    display: flex;
    width: 100%;
}
.panel-left {
    align-self: left;
}
.spacer {
    flex-grow: 1;
}
.panel-right {
    align-self: right;
}
</style>

