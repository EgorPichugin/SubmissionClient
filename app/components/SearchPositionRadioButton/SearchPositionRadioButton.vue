<script lang="ts" setup>
import { NSwitch } from 'naive-ui';
const searchNewPosition = defineModel<boolean>('searchNewPosition', { required: true });
</script>

<template>
    <div class="grid grid-cols-[1fr_auto] gap-3 items-center">
    <span class="text-lg font-medium">Search for a new position?</span>

    <n-switch v-model:value="searchNewPosition">
      <template #checked> Yes </template>
      <template #unchecked> No </template>
    </n-switch>
  </div>
</template>