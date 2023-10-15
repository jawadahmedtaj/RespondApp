<template>
    <v-card>
        <v-form v-model="form" @submit.prevent="createTask">
            <v-card-text>
                <v-text-field variant="outlined" v-model="task.title" label="Title" :rules="[isRequired]" />
                <v-textarea variant="outlined" v-model="task.description" label="Description" />
                <v-select variant="outlined" v-model="task.type" label="Type" :items="availableLocations"
                    :rules="[isRequired]" />
                <v-img cover v-if="image" :src="image" class="mb-5" max-height="200px">
                    <template #default>
                        <div class="float-right">
                            <v-btn icon @click.prevent="() => {
                                image = ''
                                task.attachment = ''
                                openImage = []
                            }">
                                <Icon name="mdi:close"> </Icon>
                            </v-btn>
                        </div>
                    </template>
                    <template #placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate />
                        </div>
                    </template>
                </v-img>
                <v-file-input variant="outlined" v-model="openImage" label="Attachment" accept="image/*"
                    :rules="[sizeExceeded]" />
                <vue-date-picker placeholder="Due Date" :teleport="true" :min-date="new Date()" v-model="task.dueDate"
                    :state="!!task.dueDate" auto-apply />
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="isEditing" color="warning" @click.prevent="deleteTask">Delete Task</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!form || !task.dueDate" type="submit" color="primary" v-if="!isEditing">Create Task</v-btn>
                <v-btn text :disabled="!form || !task.dueDate" color="primary" @click.prevent="updateTask" v-else>Update Task</v-btn>
                <v-btn color="warning" to="/">Cancel</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup>
import { useLists } from '~/store/lists'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    isEditing: {
        type: Boolean,
        default: false,
        required: false
    }
})
const emit = defineEmits(['update:modelValue'])

const task = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

onMounted(() => {
    if (task.value && task.value.attachment) {
        image.value = task.value.attachment
    }
})

const listStore = useLists()

const image = ref(null)
const openImage = ref([])

const toDataURL = (url, callback) => {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
        var reader = new FileReader()
        reader.onloadend = function () {
            callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
    };
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
}


watchEffect(() => {
    if (!openImage.value) {
        image.value = ''
        return
    }
    if (openImage.value.length === 0) {
        image.value = ''
        return
    }
    toDataURL(URL.createObjectURL(openImage.value[0]), (dataUrl) => {
        image.value = dataUrl
    })
})

const form = ref(false)

const availableLocations = [
    'Pending',
    'In Progress',
    'Done'
]

const formSetting = () => {
    if (!form.value) return
    if (!task.value.dueDate) return
    if (image.value) {
        task.value.attachment = image.value
    }
}

const setTask = () => {
    listStore.addTask(task.value)
    navigateTo('/')
}

const updateTask = () => {
    formSetting()
    listStore.deleteTask(task.value)
    setTask()
}

const createTask = () => {
    formSetting()
    task.value.creationTime = new Date()
    setTask()
}

const deleteTask = () => {
    listStore.deleteTask(task.value)
    navigateTo('/')
}
</script>

<style lang="scss" scoped></style>