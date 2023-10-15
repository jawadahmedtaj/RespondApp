<template>
    <v-container fluid>
        <v-row justify="space-around">
            <v-col cols="4">
                <v-card>
                    <v-card-title>
                        <div class="d-flex justify-space-between pa-2  rounded-lg">
                            <p>Pending</p>
                            <v-progress-circular color="secondary" :model-value="(pending.length / allTaskLength) * 100" />
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <List v-model="pending" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <v-card-title>
                        <div class="d-flex justify-space-between pa-2  rounded-lg">
                            <p>Processing</p>
                            <v-progress-circular color="secondary"
                                :model-value="(processing.length / allTaskLength) * 100" />
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <List v-model="processing" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <v-card-title>
                        <div class="d-flex justify-space-between pa-2 rounded-lg">
                            <p>Done</p>
                            <v-progress-circular color="secondary" :model-value="(done.length / allTaskLength) * 100" />
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <List v-model="done" :completed="true" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-btn icon color="primary" position="fixed" location="bottom right" class="mb-5 mr-5" to="/task/new">
            <Icon name="mdi:plus" />
        </v-btn>
        <Filter v-model="filters" />
    </v-container>
</template>

<script setup>
import { useLists } from '~/store/lists';
import moment from 'moment'

const listStore = useLists()

const allTaskLength = computed(() => listStore.getTasks.length)

const setValue = (value, type) => {
    value.forEach(task => {
        task.type = type
    })
}

const filters = ref({
    pending: false,
    processing: false,
    done: false,
    taskInThisTime: undefined,
    search: ''
})

const filteredTasks = computed(() => {
    const tasks = listStore.getTasks.filter(task => {
        if (!filters.value.pending && !filters.value.processing && !filters.value.done) {
            return true
        }
        if (filters.value.pending && task.type === 'Pending') {
            return task.type === 'Pending'
        }
        else if (filters.value.processing && task.type === 'In Progress') {
            return task.type === 'In Progress'
        }
         else if (filters.value.done && task.type === 'Done') {
            return task.type === 'Done'
        }
        else return false
    }).filter(task => {
        if (filters.value.search) {
            return task.title.toLowerCase().includes(filters.value.search.toLowerCase()) || task.description.toLowerCase().includes(filters.value.search.toLowerCase()) || task.tags.some(tag => tag.toLowerCase().includes(filters.value.search.toLowerCase()))
        }
        return true
    }).filter(task => {
        if (filters.value.taskInThisTime) {
            return moment(task.creationTime).isBefore(filters.value.taskInThisTime) && moment(task.dueDate).isAfter(filters.value.taskInThisTime)
        }
        return true
    })

    return tasks
})

const pending = computed({
    get() {
        return filteredTasks.value.filter(task => task.type === 'Pending')
    },
    set(value) {
        setValue(value, 'Pending')
    }
})
const processing = computed({
    get() {
        return filteredTasks.value.filter(task => task.type === 'In Progress')
    },
    set(value) {
        setValue(value, 'In Progress')
    }
})
const done = computed({
    get() {
        return filteredTasks.value.filter(task => task.type === 'Done')
    },
    set(value) {
        setValue(value, 'Done')
    }
})

</script>

<style lang="scss" scoped></style>