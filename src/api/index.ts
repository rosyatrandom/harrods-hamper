import type { Hamper, BasketItem } from "../state/hampers.store"

const BASE_URL = import.meta.env.DEV
    ? "https://localhost:5001"
    : "https://some-production-url" // TODO: add production url
const PRODUCTS_URL = `${BASE_URL}/Products`

export const getHampers = async () => {
    type Response = {
        products: Hamper[]
    }
    const response = await fetch(PRODUCTS_URL)
    const { products }: Response = await response.json()

    console.log("GET response", products)

    return products
}

export const sendBasket = async (basketItems: BasketItem[]) => {
    const body = JSON.stringify({ body: basketItems })
    console.log({ body })
    const response = await fetch(PRODUCTS_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body,
    })
    const json = await response.json()
    console.log("POST response", json)

    return json
}
