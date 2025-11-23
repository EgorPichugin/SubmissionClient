<script setup lang="ts">
import { NButton, NQrCode } from 'naive-ui'  
import SubmissionDialog from '~/components/SubmissionDialog/SubmissionDialog.vue'
import { api } from '~/utils/api'
import type { Submission } from '~/utils/api'
    
const isRequestFormVisible = ref<boolean>(false);
const submissions = ref<Submission[]>([]);

onMounted(async () => {
  submissions.value = await api.getAllSubmissions()
});

const isTableVisible = computed(() => {
  return submissions.value.length > 0;
});

async function handleSubmissionRequest() {
  isRequestFormVisible.value = true;
}

async function handleUpdateSubmissions() {
  submissions.value = await api.getAllSubmissions();
}
</script>

<template>
  <div class="grid place-items-center gap-10 p-4">
    <div class="text-center">
      <h2 class="text-white text-2xl md:text-4xl font-semibold tracking-tight drop-shadow-md">
        In case you want to see more awesome content,
      </h2>
      <p class="text-white/80 text-sm md:text-base mt-2">Scan the QR code below to check it out.</p>
    </div>
    <n-qr-code
      :value="'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1'"
      :size="200"
      :padding="0"
      background="transparent"
    />
    <n-button type="primary" @click="handleSubmissionRequest">Create new submission</n-button>
    <SubmissionsTable v-if="isTableVisible" v-model:data="submissions" @delete="handleUpdateSubmissions"/>
  </div>
  
  <SubmissionDialog v-model:visible="isRequestFormVisible" @submit="handleUpdateSubmissions"/>
</template>
