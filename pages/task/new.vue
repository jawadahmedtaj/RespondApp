<template>
    <v-container fluid>
        <Task v-model="task" />
    </v-container>
</template>

<script setup>
import { uuid } from 'vue-uuid'

const task = ref({
    id: uuid.v4(),
    title: '',
    description: '',
    type: undefined,
    dueDate: ''
})
</script>

<style lang="scss" scoped></style>