<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>

<template>
    <div class="bg-gray-50">
        <AppHeader />
        <slot></slot>
    </div>
</template>