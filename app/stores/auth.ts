import { defineStore } from 'pinia'
import type { User } from '../interfaces/User'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),
    persist: true,
    actions: {
        setUser(user: User | null) {
            this.user = user
        }
    },
    getters: {
        getUser: (state) => state.user,
    },
})