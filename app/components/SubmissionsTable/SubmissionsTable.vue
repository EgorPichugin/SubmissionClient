<script lang="ts" setup>
import { NDataTable, NCard, NButton, NModal, useMessage } from 'naive-ui';
import { h } from 'vue'
import type { Submission } from '~/utils/api';

const message = useMessage();
const data = defineModel<Submission[]>('data', {required: true});
const isDataDialogVisible = ref<boolean>(false);
const dialogContent = ref<string>('');

const prettyDialogContent = computed(() => {
  if (!dialogContent.value) return ""

  try {
    const parsed = JSON.parse(dialogContent.value)

    return JSON.stringify(parsed, null, 2)
  } catch {
    return dialogContent.value
  }
});

const emit = defineEmits<{
    (event: 'delete'): void;
}>();

const columns = [
    {
        title: 'Form Name',
        key: 'formName',
    },
    {
        title: 'Created At',
        key: 'datetime',
        render(row: Submission) {
            const parsed = new Date(row.datetime);
            return new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }).format(parsed);
        }   
    },
    {
        title: 'Data',
        key: 'data',
        render(row: Submission) {
            return h(
            NButton,
            {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: () => displayData(row)
            },
            { default: () => 'Show' }
            )
        }
    },
    {
        title: 'Actions',
        key: 'actions',
        render(row: Submission) {
        return h(
            NButton,
            {
            type: 'error',
            size: 'small',
            tertiary: true,
            onClick: () => handleDelete(row)
            },
            { default: () => 'Delete' }
        )
        }
    }
];

async function handleDelete(submission: Submission) {
    await api.deleteSubmission(submission.id);
    message.success('Submission deleted successfully!');
    emit('delete');
}

function displayData(submission: Submission) {
    dialogContent.value = submission.data;;
    isDataDialogVisible.value = true;
}

function handleHideDialog() {
    dialogContent.value = '';
    isDataDialogVisible.value = false;
}

</script>

<template>
    <n-data-table 
        style="width:50%"
        :columns="columns" 
        :data="data"
        :bordered="false" />

    <n-modal v-model:show="isDataDialogVisible" @after-leave="handleHideDialog">
        <n-card
                title="Data Details"
                style="width: 400px;"
                :bordered="false"
                role="dialog">
                <pre style="white-space: pre-wrap; word-break: break-word; margin: 0;">
{{ prettyDialogContent }}
                </pre>
        </n-card>
    </n-modal>
</template>