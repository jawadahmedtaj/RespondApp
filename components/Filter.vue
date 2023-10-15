<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
        <template #activator="{ props }">
            <v-btn icon color="primary" position="fixed" location="bottom left" class="ml-5 mb-5" v-bind="props">
                <Icon name="mdi:filter" />
            </v-btn>
        </template>

        <v-card min-width="300" max-width="500">
            <v-list>
                <v-list-item>
                    <v-switch v-model="filters.pending" color="purple" label="Only Pending" hide-details></v-switch>
                </v-list-item>

                <v-list-item>
                    <v-switch v-model="filters.processing" color="purple" label="Only In Progress" hide-details></v-switch>
                </v-list-item>
                <v-list-item>
                    <v-switch v-model="filters.done" color="purple" label="Only Done" hide-details></v-switch>
                </v-list-item>
            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="menu = false">
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