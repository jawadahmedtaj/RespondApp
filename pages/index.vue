<template>
    <v-container fluid>
        <v-row justify="space-around">
            <v-col class="d-flex align-center">
                <draggable v-model="myArray" group="people" @start="drag = true" @end="drag = false" item-key="id">
                    <template #item="{ element }">
                        <div class="text-h1">{{ element.name }}</div>
                    </template>
                </draggable>
            </v-col>
            <v-col class="d-flex align-center">2</v-col>
            <v-col class="d-flex align-center">3</v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import draggable from 'vuedraggable'

const drag = ref(false)
const myArray = ref([{ name: 'a', id: 0 }, { name: 'b', id: 1 }, { name: 'c', id: 2 }, { name: 'd', id: 3 }, { name: 'e', id: 4 }, { name: 'f', id: 5 }, { name: 'g', id: 6 }])

</script>

<style lang="scss" scoped></style>