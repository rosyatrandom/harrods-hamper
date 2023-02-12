<script setup lang="ts">
import { useHampersStore } from "../state/hampers.store"
import BasketItem from "./BasketItem.vue"

const store = useHampersStore()
</script>
<template>
    <Transition
        enter-from-class="translate-x-full opacity-0"
        enter-active-class="transition-all"
        enter-to-class=""
        leave-from-class=""
        leave-active-class="transition-all"
        leave-to-class="translate-x-full opacity-0"
    >
        <div
            v-if="store.basket.size"
            class="rounded-l-lg border-l-2 border-y-2 p-2 border-transparent bg-yellow-50 text-yellow-900 h-screen w-96"
        >
            <h1>Your Basket ({{ store.basketTotals.quantity }})</h1>
            <TransitionGroup
                tag="div"
                class="flex-col"
                move-class="transition-all"
                enter-from-class="translate-x-full opacity-0"
                enter-active-class="transition-all"
                enter-to-class=""
                leave-from-class=""
                leave-active-class="transition-all absolute"
                leave-to-class="translate-x-full opacity-0"
            >
                <BasketItem
                    v-for="item in store.basket.values()"
                    :key="item.id"
                    :id="item.id"
                    class="mb-2"
                />
                <hr class="border-dotted border-yellow-600 my-12" />
                <h2 key="total">Total: £{{ store.basketTotals.total }}</h2>
                <button
                    title="Submit Basket"
                    aria-label="Submit Basket"
                    key="submit"
                    @click="store.submitBasket"
                >
                    PURCHASE
                </button>
            </TransitionGroup>
        </div>
    </Transition>
</template>
