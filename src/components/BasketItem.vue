<script setup lang="ts">
import { computed } from "vue"
import { useHampersStore } from "../state/hampers.store"

const store = useHampersStore()
const props = defineProps<{
    id: number
}>()

const item = computed(() => store.combinedHamperDataItemById(props.id))
</script>

<template>
    <div v-if="item">
        <div>
            <h3>
                {{ item.title }}
                <span class="text-sm italic">({{ item.quantity }})</span>
            </h3>
        </div>
        <div class="flex justify-items-end items-center">
            <span class="w-20 font-bold"> £{{ item.subtotal }} </span>
            <button
                title="Remove all items from Basket"
                aria-label="Remove all items from Basket"
                class="p-1 bg-red-600 text-red-50 border-red-700 hover:bg-red-400 hover:text-red-900 hover:border-red-800"
                @click="store.removeItemFromBasket(props.id)"
            >
                &#10005;
            </button>
            <button
                title="Remove one item from Basket"
                aria-label="Remove one item from Basket"
                class="p-1 rounded-r-none mr-0 border-r-0"
                @click="store.decrementBasketItemQuantity(props.id)"
            >
                &minus;
            </button>
            <button
                title="Add another to Basket"
                aria-label="Add another to Basket"
                class="p-1 rounded-l-none ml-0 border-l-0"
                :disabled="item.availableStock === 0"
                @click="store.incrementBasketItemQuantity(props.id)"
            >
                &plus;
            </button>
        </div>
    </div>
</template>
