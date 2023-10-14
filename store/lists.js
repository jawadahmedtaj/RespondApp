import { defineStore } from "pinia"

export const useLists = defineStore('Lists', {
    state: () => ({
        tasks: [
        ],
    }),
    getters: {
        getTasks: (state) => state.tasks,
    },
    actions: {
        setTasks(data) {
            this.tasks = data
        },
    },
    persist: true
})