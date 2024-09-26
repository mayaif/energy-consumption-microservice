<script setup lang="ts">
import AppNavigation from './AppNavigation.vue';
import { AlignJustify, X } from 'lucide-vue-next';

import { ref } from "vue"

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}


</script>

<template>
    <header class="p-4 bg-blue-900">
        <div class="container flex justify-between items-center text-white">
            <nav :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen, 'md:block': true }">
                <AppNavigation />
            </nav>
            <button @click="toggleMenu" class="md:hidden ml-auto">
                <AlignJustify v-if="!isMenuOpen" />
                <X v-else />
            </button>

        </div>
    </header>
</template>