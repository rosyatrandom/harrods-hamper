import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { Ref } from "vue"
import { getHampers, sendBasket } from "../api"

export type Hamper = {
    id: number
    title: string
    price: number
    stock: number
}

export type BasketItem = { id: number; quantity: number }

export type Basket = Map<number, BasketItem>

const defaultBasketItem = (id: number) => ({ id, quantity: 0 })

export const useHampersStore = defineStore("hampers", () => {
    const hampers: Ref<Map<number, Hamper>> = ref(new Map())

    const hamperById = (id: number) => hampers.value.get(id)

    const basket: Ref<Basket> = ref(new Map())

    const basketItemById = (id: number) => basket.value.get(id)

    const combinedHamperData = computed(() => {
        type CombinedHamperDataItem = Hamper &
            BasketItem & {
                subtotal: number
                availableStock: number
            }
        const value: Map<number, CombinedHamperDataItem> = new Map()
        hampers.value.forEach((hamper, id) => {
            const basketItem = basketItemById(id) || defaultBasketItem(id)
            const combinedItem = {
                ...hamper,
                ...basketItem,
                subtotal: hamper.price * basketItem.quantity,
                availableStock: hamper.stock - basketItem.quantity,
            }
            value.set(id, combinedItem)
        })
        return value
    })

    const basketTotals = computed(() => {
        let quantity = 0
        let total = 0
        combinedHamperData.value.forEach((item) => {
            quantity += item.quantity
            total += item.subtotal
        })

        return { quantity, total }
    })

    const combinedHamperDataItemById = (id: number) =>
        combinedHamperData.value.get(id)

    const incrementBasketItemQuantity = (id: number) => {
        const basketItem = ensureItemInBasket(id)

        basketItem.quantity += 1
    }

    const decrementBasketItemQuantity = (id: number) => {
        const basketItem = ensureItemInBasket(id)

        basketItem.quantity -= 1

        if (basketItem.quantity < 1) {
            removeItemFromBasket(id)
        }
    }

    const ensureItemInBasket = (id: number) => {
        if (!basket.value.has(id)) {
            const basketItem = defaultBasketItem(id)
            basket.value.set(id, basketItem)
        }

        return basket.value.get(id)!
    }

    const removeItemFromBasket = (id: number) => {
        basket.value.delete(id)
    }

    const submitBasket = async () => {
        try {
            const basketItems = [...basket.value.values()]
            sendBasket(basketItems)
            basket.value.clear()
        } catch (error) {
            console.warn("FAILED TO POST BASKET", error)
        }
    }

    const updateAllHampers = async () => {
        try {
            const newHampers = await getHampers()

            hampers.value.clear()
            newHampers.forEach((hamper) => {
                hampers.value.set(hamper.id, hamper)
            })
        } catch (error) {
            console.warn("FAILED TO UPDATE HAMPERS", error)
        }
    }

    return {
        hampers,
        basket,
        combinedHamperData,
        basketTotals,
        hamperById,
        basketItemById,
        combinedHamperDataItemById,
        incrementBasketItemQuantity,
        decrementBasketItemQuantity,
        removeItemFromBasket,
        updateAllHampers,
        submitBasket,
    }
})
