import { useHampersStore } from "../state/hampers.store"
import { onBeforeMount, onUnmounted } from "vue"

export default (interval: number = 10_000) => {
    const { updateAllHampers } = useHampersStore()
    let intervalId: number

    onBeforeMount(() => {
        updateAllHampers()
        intervalId = setInterval(() => {
            updateAllHampers()
        }, interval)
    })

    onUnmounted(() => {
        clearInterval(intervalId)
    })
}
