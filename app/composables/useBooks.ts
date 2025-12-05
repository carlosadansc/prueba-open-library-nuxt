import { computed } from "vue";
import { useBooksStore } from "../stores/books";
import { storeToRefs } from "pinia";
import type { Filter } from "../interfaces/Filter";
import type { Book } from "../interfaces/Books";

export const useBooks = () => {
  const booksStore = useBooksStore();
  const { books, filter, loading, year, search, limit, page, gridView, totalResults } =
    storeToRefs(booksStore);

  const setBooks = (books: Book[]) => {
    booksStore.setBooks(books);
  };

  const setFilter = (filter: Filter | null) => {
    booksStore.setFilter(filter);
  };

  const setYear = (year: number | null) => {
    booksStore.setYear(year);
  };

  const setLoading = (loading: boolean) => {
    booksStore.setLoading(loading);
  };

  const setSearch = (search: string) => {
    booksStore.setSearch(search);
  };

  const setLimit = (limit: number) => {
    booksStore.setLimit(limit);
  };

  const setPage = (page: number) => {
    booksStore.setPage(page);
  };

  const setGridView = (gridView: boolean) => {
    booksStore.setGridView(gridView);
  };

  const setTotalResults = (total: number) => {
    booksStore.setTotalResults(total);
  };

  const getBooks = computed(() => books.value);

  return {
    books,
    filter,
    loading,
    setBooks,
    setFilter,
    setLoading,
    year,
    setYear,
    search,
    setSearch,
    limit,
    setLimit,
    page,
    setPage,
    getBooks,
    gridView,
    setGridView,
    totalResults,
    setTotalResults,
  };
};
