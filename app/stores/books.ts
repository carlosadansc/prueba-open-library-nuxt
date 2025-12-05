import { defineStore } from "pinia";
import type { Filter } from "../interfaces/Filter";
import type { Book } from "../interfaces/Books";

export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [] as Book[],
    filter: { label: "Todos", value: "all" } as Filter | null,
    year: null as number | null,
    limit: 10 as number,
    page: 1 as number,
    search: "all" as string,
    loading: false,
    gridView: true as boolean,
		totalResults: 0 as number,
  }),
  actions: {
    setBooks(books: Book[]) {
      this.books = books;
    },
    setFilter(filter: Filter | null) {
      this.filter = filter;
    },
    setYear(year: number | null) {
      this.year = year;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setSearch(search: string) {
      this.search = search;
    },
    setLimit(limit: number) {
      this.limit = limit;
    },
    setPage(page: number) {
      this.page = page;
    },
    setGridView(gridView: boolean) {
      this.gridView = gridView;
    },
		setTotalResults(total: number) {
			this.totalResults = total;
		}
  },
  getters: {
    getBooks: (state) => state.books,
    getFilter: (state) => state.filter,
    getYear: (state) => state.year,
    getLoading: (state) => state.loading,
    getSearch: (state) => state.search,
    getLimit: (state) => state.limit,
    getPage: (state) => state.page,
    getGridView: (state) => state.gridView,
		getTotalResults: (state) => state.totalResults,
  },
});
