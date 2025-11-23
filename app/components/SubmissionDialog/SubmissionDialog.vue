<script setup lang="ts">
import { NModal } from 'naive-ui';
import { NCard } from 'naive-ui';
import { NButton } from 'naive-ui';
import NameInput from '~/components/NameInput/NameInput.vue';
import { useMessage } from 'naive-ui'
import { validations, type ErrorInstance } from '~/utils/validation';

const isVisible = defineModel<boolean>('visible', { type: Boolean, default: false });
const message = useMessage();
const name = ref<string>('');
const surname = ref<string>('');
const errors = ref<ErrorInstance[]>([]);

const profession = ref<string>('');
const timestamp = ref<number>(Date.now());
const searchNewPosition = ref<boolean>(false);
const cities = ref<string[]>([]);

const emit = defineEmits<{
    (event: 'submit'): void;
}>();

async function handleSubmissionRequest() {
    if (errors.value.length > 0) {
        for (const error of errors.value) {
            message.error(`${error.fieldName} error: ${error.errorMessage}`);
        }

        return;
    }

    try {
        await api.createSubmission({
            "formName": "My Submission Form",
            "data": {
                "name": name.value,
                "surname": surname.value,
                "profession": profession.value,
                "timestamp": timestamp.value,
                "searchNewPosition": searchNewPosition.value,
                "cities": cities.value
            }
        });
        message.success('Submission created successfully!');
        emit('submit');
    } catch (error) {
        message.error('Failed to create submission. Please try again.');
        return;
    }
    isVisible.value = false;
}

function handleHideAction() {
    name.value = '';
    surname.value = '';
    profession.value = '';
    timestamp.value = Date.now();
    searchNewPosition.value = false;
    cities.value = [];
}

</script>

<template>

    <n-modal v-model:show="isVisible" @after-leave="handleHideAction">
        <n-card
            title="Give me your data :)"
            style="width: 400px;"
            :bordered="false"
            role="dialog">

            <div class="grid gap-4">
                <NameInput v-model:name="name" v-model:surname="surname" v-model:errors="errors"/>
                <PositionDropdown v-model:profession="profession" v-model:errors="errors" />
                <DateSelector v-model:timestamp="timestamp" />
                <SearchPositionRadioButton v-model:searchNewPosition="searchNewPosition" />
                <CitiesCheckbox v-model:cities="cities" v-model:errors="errors" />
                <n-button type="primary" @click="handleSubmissionRequest">Create new submission</n-button>
            </div>
        </n-card>
    </n-modal>

</template>