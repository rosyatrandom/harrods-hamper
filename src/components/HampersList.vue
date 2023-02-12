<script setup lang="ts">
import HamperItem from "./HamperItem.vue"
import { useHampersStore } from "../state/hampers.store"

const store = useHampersStore()
</script>

<template>
    <div class="p-2">
        <h1>Hampers</h1>
        <HamperItem
            v-for="id in store.hampers.keys()"
            :key="id"
            :id="id"
            class="mb-2 last-of-type:mb-0"
        />
    </div>
</template>
