import { defineStore } from "pinia"

export const useLists = defineStore('Lists', {
    state: () => ({
        tasks: []
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getPending: (state) => state.tasks.filter(task => task.type === 'Pending'),
        getInProgress: (state) => state.tasks.filter(task => task.type === 'In Progress'),
        getDone: (state) => state.tasks.filter(task => task.type === 'Done'),
        getTaskById: (state) => (id) => {
            return state.tasks.find(task => task.id === id) || null
        }
    },
    actions: {
        addTask(payload) {
            this.tasks.push(payload)
        },
        setTask(payload) {
            this.tasks.splice(0)
            this.tasks.push(...payload)
        },
        updateTask(payload) {
            const task = this.getTaskById(payload.id)
            if (task) {
                Object.assign(task, payload)
            }
        },
        deleteTask(payload) {
            const task = this.getTaskById(payload.id)
            if (task) {
                const index = this.getTasks.findIndex(task => task.id === payload.id)
                this.getTasks.splice(index, 1)
            }
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
})