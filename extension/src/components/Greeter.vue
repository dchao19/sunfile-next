<template>
    <h1>hello, {{ name }}</h1>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AuthService from '@/services/authService';

export default class Greeter extends Vue {
    get name() {
        return AuthService.name.split(" ")[0];
    }
}
</script>
