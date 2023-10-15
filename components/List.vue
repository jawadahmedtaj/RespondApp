<template>
    <draggable v-model="value" group="taskList" @start="drag = true" @end="drag = false" item-key="id"
        style="min-height: 25%;">
        <template #item="{ element, index }">
            <v-card @click.prevent="openTask(element)" :class="{ 'mt-2': index !== 0, 'bg-success': completed }">
                <v-card-title>
                    {{ element.title }}
                </v-card-title>
                <v-card-subtitle>
                    {{ element.description }}
                </v-card-subtitle>
                <v-card-text>
                    <v-chip v-for="tag in element.tags" :key="tag" :color="colorRandomizer()">
                        {{ tag }}
                    </v-chip>
                </v-card-text>
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

const colorRandomizer = () => {
    const colors = ['primary', 'secondary', 'accent', 'error', 'warning', 'info', 'success']
    return colors[Math.floor(Math.random() * colors.length)]
}

</script>

<style lang="scss" scoped></style>