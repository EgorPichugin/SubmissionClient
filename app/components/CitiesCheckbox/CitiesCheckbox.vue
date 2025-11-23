<script lang="ts" setup>
import { NCheckbox, NCheckboxGroup, NSpace } from 'naive-ui';

const cities = defineModel<string[]>('cities', { required: true });
const errors = defineModel<ErrorInstance[]>('errors', { required: true });

watch(cities, (newValue) => {
  const exists = errors.value.some(error => error.fieldName === "cities");
    const failed = validations.isCollectionEmpty(newValue);
    if (failed && !exists) {
        errors.value.push({ fieldName: "cities", errorMessage: validations.isCollectionEmpty.errorMessage });
    } else if (!failed && exists) {
        errors.value = errors.value.filter(error => error.fieldName !== "cities");
    }
}, { immediate: true })

</script>

<template>
    <div class="flex flex-col gap-2">
        <span class="text-lg font-medium">Which cities are you interested in?</span>

        <n-checkbox-group v-model:value="cities">
            <n-space item-style="display: flex;">
                <n-checkbox value="Rome" label="Rome" />
                <n-checkbox value="New York" label="New York" />
                <n-checkbox value="Paris" label="Paris" />
                <n-checkbox value="Vienna" label="Vienna" />
            </n-space>
        </n-checkbox-group>
    </div>
</template>