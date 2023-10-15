<template>
    <div v-if="task">
        <Task v-model="task" :isEditing="true" />
    </div>
    <div v-else>Task doesn't exist</div>
</template>

<script setup>
import { useLists } from '~/store/lists'

const listStore = useLists()

const route = useRoute()

const task = ref({})

onMounted(() => {
    task.value = listStore.getTaskById(route.params.id)
})

</script>

<style lang="scss" scoped></style>