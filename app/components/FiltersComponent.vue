<template>
  <div class="flex justify-between items-center mb-4 w-full">
     <div class="flex gap-2 items-center">
        <USelect class="w-30" :model-value="defaultFilter.value" :items="filters" @update:model-value="selectFilterHandler"/>
        <UInput v-model="inputSearch" placeholder="Buscar" />
        <USelect class="w-30" :model-value="selectedYearValue" :items="yearOptions" option-attribute="label" @update:model-value="selectedYearHandler"/>
        <UButton color="primary" @click.prevent="searchHandler">Buscar</UButton>
        <UButton color="primary" variant="ghost" @click.prevent="clearFilters">Limpiar</UButton>
        <span class="text-xs italic text-gray-500">{{ totalResults }} Resultados</span>
      </div>
    <UButton :icon="gridView ? 'i-lucide-grid' : 'i-lucide-list'" size="md" color="neutral" variant="outline" @click.prevent="changeGridView" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Filter } from '../interfaces/Filter'

const { setYear, setFilter, setSearch, filter, setPage, gridView, setGridView, totalResults, year } = useBooks()

const emits = defineEmits(['searchBooks'])

const filters = ref<Filter[]>([
    { label: 'Todos', value: 'all' },
    { label: 'Título', value: 'title' },
    { label: 'Autor', value: 'author' }
])

const defaultFilter =  ref<Filter>({ label: 'Todos', value: 'all' })
const inputSearch = ref('')
const selectedYearValue = ref<number | null>(null)

const selectFilterHandler = (value: string) => {
  const selectedFilter = filters.value.find(filter => filter.value === value) || null
  setFilter(selectedFilter)
  if (selectedFilter) {
    defaultFilter.value = selectedFilter
  }
}

const yearOptions = ref([
  { label: 'Año', value: null },
  ...Array.from({ length: 36 }, (_, i) => ({ label: String(1990 + i), value: 1990 + i }))
])

const selectedYearHandler = (value: number | null) => {
   setYear(value)
}

watch(inputSearch, (newInputSearch) => {
    if (newInputSearch === '') {
        setSearch('all')
    } else {
        setSearch(newInputSearch)
    }
})

watch(year, (newYear) => {
    selectedYearValue.value = newYear
})

const searchHandler = () => {
    emits('searchBooks')
}

const clearFilters = () => {
    defaultFilter.value = { label: 'Todos', value: 'all' }
    inputSearch.value = ''
    setFilter({ label: 'Todos', value: 'all' })
    setSearch('all')
    setYear(null)
    searchHandler()
    setPage(1)
}

const changeGridView = () => {
    setGridView(!gridView.value)
}

onMounted(() => {
  defaultFilter.value = filter.value || { label: 'Todos', value: 'all' }
})
</script>