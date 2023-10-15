<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end" persistent>
        <template #activator="{ props }">
            <v-btn icon color="primary" position="fixed" location="bottom left" class="ml-5 mb-5" v-bind="props">
                <Icon name="mdi:filter" />
            </v-btn>
        </template>

        <v-card min-width="300" max-width="500">
            <v-list>
                <v-list-item>
                    <v-text-field variant="outlined" v-model="filters.search" color="purple" label="Text search"
                        hide-details></v-text-field>
                </v-list-item>
                <v-list-item>
                    <vue-date-picker placeholder="Tasks in this time" :teleport="true" v-model="filters.taskInThisTime" auto-apply />
                </v-list-item>
                <v-list-item>
                    <v-switch v-model="filters.pending" color="purple" label="Pending" hide-details></v-switch>
                </v-list-item>
                <v-list-item>
                    <v-switch v-model="filters.processing" color="purple" label="In Progress" hide-details></v-switch>
                </v-list-item>
                <v-list-item>
                    <v-switch v-model="filters.done" color="purple" label="Done" hide-details></v-switch>
                </v-list-item>
            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="resetForm">
                    Reset
                </v-btn>
                <v-btn variant="text" @click="menu = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const resetForm = () => {
    filters.value = {
        pending: false,
        processing: false,
        done: false,
        taskInThisTime: undefined,
        search: ''
    }
}

const menu = ref(false)

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const filters = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>