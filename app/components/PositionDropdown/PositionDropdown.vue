<script setup lang="ts">
import { NDropdown } from 'naive-ui';
import { NButton } from 'naive-ui';

import { useMessage } from 'naive-ui'

const profession = defineModel<string>('profession', {required: true});
const displayedProfession = ref<string>('Select Profession');
const errors = defineModel<ErrorInstance[]>('errors', {required: true});
const message = useMessage()
const options = [
  {
    label: 'Engineer',
    key: 'engineer'
  },
  {
    label: 'Painter',
    key: 'painter'
  },
  {
    label: 'Doctor',
    key: 'doctor'
  },
  {
    label: 'HR Manager',
    key: 'hr manager'
  }
]

function handleSelect(key: string | number, options: any) {
  message.info(String(options.label + ' selected'))
  profession.value = String(options.label)
  displayedProfession.value = options.label
}

watch(profession, (newValue) => {
  const exists = errors.value.some(error => error.fieldName === "profession");
    const failed = validations.isNullOrUndefined(newValue);
    if (failed && !exists) {
        errors.value.push({ fieldName: "profession", errorMessage: validations.isNullOrUndefined.errorMessage });
    } else if (!failed && exists) {
        errors.value = errors.value.filter(error => error.fieldName !== "profession");
    }
}, { immediate: true })
</script>

<template>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-button>{{ displayedProfession }}</n-button>
    </n-dropdown>

</template>