<script setup lang="ts">
import useUpdateHampers from "../use/useUpdateHampers"
import ShoppingBasket from "./ShoppingBasket.vue"
import HampersList from "./HampersList.vue"

useUpdateHampers()
</script>

<template>
    <div class="grid grid-cols-2 gap-16 ml-8 justify-items-end">
        <HampersList />
        <ShoppingBasket />
    </div>
</template>
