<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export interface AppTableColumn {
  key: string
  header: string
  field?: string
}

withDefaults(
  defineProps<{
    value: unknown[]
    loading?: boolean
    columns: AppTableColumn[]
  }>(),
  { loading: false },
)
</script>

<template>
  <DataTable :value="value" :loading="loading" striped-rows responsive-layout="scroll">
    <Column v-for="column in columns" :key="column.key" :field="column.field" :header="column.header">
      <template v-if="$slots[`body-${column.key}`]" #body="slotProps">
        <slot :name="`body-${column.key}`" v-bind="slotProps" />
      </template>
    </Column>
  </DataTable>
</template>
