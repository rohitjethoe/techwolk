import { defineStore } from 'pinia'
// might use this later to improve speed
export const useProductsStore = defineStore('posts', {
    state: () => ({
        latestPost: null,
    })
})