<template>
  <div class="flex flex-col flex-1 w-full">
    <div v-if="gridView" :class="gridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4' : ''">
      <BookCard
        v-for="book in books"
        :key="book.title"
        :title="book.title"
        :author-name="Array.isArray(book.author_name) ? book.author_name.join(', ') : book.author_name"
        :first-publish-year="book.first_publish_year"
      />
    </div>
    
    <UTable
      v-else
      ref="table"
      :loading="loading"
      loading-color="primary"
      :data="books"
      :columns="columns"
      truncate-text
    />
    <div class="flex justify-end border-t border-default pt-4 px-4">
      <ULabel class="mr-2 self-center text-sm font-medium">Items por página:</ULabel>
      <UInputNumber v-model="limit" class="w-30" :min="5" :max="20" :step="5" />
      <UPagination
        class="ml-4"
        :page="page"
        :items-per-page="limit"
        :total="totalItems"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Book } from "~/interfaces/Books";

defineProps<{
  totalItems: number;
}>();

const emits = defineEmits(['fetch-data']);

const { loading, page, limit, setPage, books, gridView } = useBooks();

const columns: TableColumn<Book>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      return row.getValue("title");
    },
  },
  {
    accessorKey: "author_name",
    header: "Autor",
    cell: ({ row }) => {
      const authors = row.getValue("author_name");
      return Array.isArray(authors) ? authors.join(", ") : authors;
    },
  },
  {
    accessorKey: "first_publish_year",
    header: "Año de publicación",
    cell: ({ row }) => {
      return row.getValue("first_publish_year");
    },
  },
];

const handlePageChange = (newPage: number) => {
  setPage(newPage);
  emits('fetch-data');
};

const table = useTemplateRef("table");
</script>
