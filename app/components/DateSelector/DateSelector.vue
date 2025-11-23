<script lang="ts" setup>
import { NDatePicker } from 'naive-ui';

const timestamp = defineModel<number>('timestamp', { required: true });
</script>

<template>
    <n-date-picker v-model:value="timestamp" type="date" />
</template>