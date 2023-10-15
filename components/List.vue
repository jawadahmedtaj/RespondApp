<template>
    <draggable v-model="value" group="taskList" @start="drag = true" @end="drag = false" item-key="id" style="min-height: 25%;">
        <template #item="{ element, index }">
            <v-card @click.prevent="openTask(element)" :class="{ 'mt-2': index !== 0, 'bg-success': completed }">
                <v-card-title>
                    {{ element.title }}
                </v-card-title>
                <v-card-subtitle>
                    {{ element.description }}
                </v-card-subtitle>
            </v-card>
        </template>
    </draggable>
</template>

<script setup>
import draggable from 'vuedraggable'

const drag = ref(false)

const props = defineProps(['modelValue', 'completed'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const openTask = (task) => {
    navigateTo(`/task/${task.id}`)
}

</script>

<style lang="scss" scoped>


</style>