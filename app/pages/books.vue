<template>
  <div>
    <FiltersComponent @search-books="getBooks" />
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"
      />
    </div>
    <BooksTable
      v-else
      :data="books"
      :total-items="totalBooks"
      @fetch-data="getBooks"
    />
  </div>
</template>

<script setup lang="ts">
import type { Book } from "~/interfaces/Books";
import type { QueryParams } from "~/interfaces/QueryParams";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
  name: "books",
  title: "Libros",
  icon: "i-bx-book",
  path: "/books",
});

const baseUrl = useRuntimeConfig().public.apiUrlBase as string;
const router = useRouter();
const route = useRoute();
const toast = useToast();

const {
  books,
  setBooks,
  setLoading,
  filter,
  year,
  search,
  limit,
  page,
  setSearch,
  setYear,
  setPage,
  setLimit,
  setTotalResults,
  loading,
} = useBooks();

const totalBooks = ref(0);

const getBooks = async () => {
  const payload: QueryParams = {
    q: filter.value?.value === "all" ? search.value : undefined,
    title: filter.value?.value === "title" ? search.value : undefined,
    author: filter.value?.value === "author" ? search.value : undefined,
    first_publish_year: year.value || undefined,
    limit: limit.value,
    page: page.value,
  };
  const formatedPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );

  router.push({
    path: router.currentRoute.value.path,
    query: { ...formatedPayload },
  });

  setLoading(true);

  try {
    const data = await $fetch(baseUrl, {
      query: formatedPayload,
    });
    if (!data) {
      toast.add({
        title: "Error",
        description: `Sucedió un error al obtener los libros.`,
        icon: "i-lucide-danger",
        color: "error",
      });
      setBooks([]);
      setTotalResults(0);
      totalBooks.value = 0;
      setLoading(false);
      return;
    } else if ((data as { docs: Book[] }).docs.length === 0) {
      toast.add({
        title: "Sin resultados",
        description: `No se encontraron libros para tu búsqueda.`,
        icon: "i-lucide-info",
        color: "warning",
      });
    }
    const booksData = data as { docs: Book[]; num_found: number };
    totalBooks.value = booksData.num_found;
    setTotalResults(booksData.num_found);
    setBooks(booksData.docs);
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  setLoading(false);
};

onMounted(() => {
  // Sincronizar query params de la URL con el store
  const queryParams = route.query;

  if (queryParams.q) setSearch(queryParams.q as string);
  if (queryParams.title) setSearch(queryParams.title as string);
  if (queryParams.author) setSearch(queryParams.author as string);
  if (queryParams.first_publish_year)
    setYear(Number(queryParams.first_publish_year));
  if (queryParams.limit) setLimit(Number(queryParams.limit));
  if (queryParams.page) setPage(Number(queryParams.page));

  getBooks();
});
</script>
