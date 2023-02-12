<script setup lang="ts">
import { useHampersStore } from "../state/hampers.store"
import { computed } from "vue"

const props = defineProps<{
    id: number
}>()

const store = useHampersStore()
const hamper = computed(() => store.combinedHamperDataItemById(props.id))
</script>

<template>
    <template v-if="hamper">
        <div class="inline-flex items-center gap-4">
            <button
                :disabled="!hamper.availableStock"
                title="Add item to Basket"
                aria-label="Add item to Basket"
                @click="store.incrementBasketItemQuantity(id)"
            >
                ADD
            </button>
            <h3 class="mb-0">
                {{ hamper.title }}:
                <span class="text-sm">£{{ hamper.price }}</span>
                <span
                    v-if="hamper.availableStock < 4"
                    class="text-yellow-300 italic text-sm"
                >
                    <template v-if="hamper.availableStock">
                        (Only {{ hamper.availableStock }} left)
                    </template>
                    <template v-else> (None left in stock) </template>
                </span>
            </h3>
        </div>
    </template>
</template>
