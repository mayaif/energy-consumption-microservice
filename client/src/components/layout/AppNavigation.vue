<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <ul class=" flex space-x-4">
        <li class="hover:underline hover:font-bold">
            <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="hover:underline hover:font-bold">
            <RouterLink to="/about">About</RouterLink>
        </li>
    </ul>
</template>