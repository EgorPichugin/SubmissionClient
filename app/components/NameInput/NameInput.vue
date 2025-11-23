<script setup lang="ts">
import { NInput } from 'naive-ui'
import type { error } from 'naive-ui/es/_utils/naive/warn';
import { validations, type ErrorInstance } from '~/utils/validation';

const name = defineModel<string>('name', {required: true});
const surname = defineModel<string>('surname', {required: true});
const errors = defineModel<ErrorInstance[]>('errors', {required: true});

function updateError(fieldName: string, value: string) {
    const exists = errors.value.some(error => error.fieldName === fieldName);
    const failed = validations.isEmptyString(value);
    if (failed && !exists) {
        errors.value.push({ fieldName, errorMessage: validations.isEmptyString.errorMessage });
    } else if (!failed && exists) {
        errors.value = errors.value.filter(error => error.fieldName !== fieldName);
    }
}

watch(name, value => updateError('name', value), { immediate: true });
watch(surname, value => updateError('surname', value), { immediate: true });

</script>

<template>
    <div class="grid gap-3">
        <n-input v-model:value="name" type="text" placeholder="First Name" />
        <n-input v-model:value="surname" type="text" placeholder="Last Name" />
    </div>
</template>