<script setup lang="ts">
import { ref } from 'vue'

const refs = ref({
    addDate: '',
    addConsumption: ''
})

const emit = defineEmits(['submitData'])

const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (refs.value.addDate && refs.value.addConsumption) { emit('submitData', refs.value.addDate, parseFloat(refs.value.addConsumption)) }
}
</script>

<template>
    <form @submit="handleSubmit" class="mx-auto w-full flex items-end md:justify-center space-x-4 mb-10">
        <div
            class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center items-start md:items-center">
            <div class="flex flex-col mb-1">
                <label for="date">Date</label>
                <input id="date" v-model="refs.addDate" required type="date" class="border p-2 border-gray-400" />
            </div>
            <div class="flex flex-col">
                <label for="consumption">Consumption</label>
                <input id="consumption" v-model="refs.addConsumption" required type="number"
                    class="border p-2 border-gray-400" />
            </div>
        </div>

        <button type="submit" class="px-4 py-2 mb-1 bg-blue-900 text-white">Add</button>
    </form>
</template>