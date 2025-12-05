<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-screen transition-transform',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'w-64 bg-white dark:bg-gray-800',
      ]"
    >
      <div class="p-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          Libros 📚
        </h2>
      </div>

      <nav class="p-4 space-y-2">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.to"
          :to="link.to === '/books' ? { path: link.to, query: { ...queryParams } } : link.to"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="
            route.path === link.to
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
              : 'text-gray-700 dark:text-gray-300'
          "
        >
          <UIcon :name="link.icon" class="w-5 h-5" />
          <span class="font-medium">{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-4">
      <UButton
          size="sm"
          color="primary"
          variant="outline"
          class="w-full mb-2 justify-center"
          @click="clickLogout"
        >Cerrar Sesión</UButton>
        <span class="text-sm text-gray-500 dark:text-gray-400"
          >Prueba Libros ft Open Library / Carlos Sánchez</span
        >
      </div>
    </aside>

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-gray-900/50 md:hidden"
      @click="sidebarOpen = false"
    />

    <div class="md:ml-64">
      <header class="sticky top-0 z-20 bg-white dark:bg-gray-800">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-4">
            <UButton
              icon="i-lucide-menu"
              color="secondary"
              variant="ghost"
              class="md:hidden"
              @click="sidebarOpen = !sidebarOpen"
            />
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              / {{ pageTitle }}
            </h1>
          </div>

          <div class="flex items-center gap-2">
            <ClientOnly>
              <UButton
                size="md"
                color="secondary"
                variant="ghost"
                :icon="iconTheme"
                class="rounded-full"
                @click="toggleTheme"
              />
            </ClientOnly>

            <UAvatar src="https://github.com/nuxt.png" size="md" />
          </div>
        </div>
      </header>

      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { QueryParams } from "~/interfaces/QueryParams";

const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();
const { logout } = useAuth();
const { filter, year, search, limit, page } = useBooks();
const sidebarOpen = ref(false);

const pageTitle = computed(() => {
  const meta = route.meta;
  return meta.title || "Dashboard";
});

const isDark = computed(() => colorMode.value === "dark");
const iconTheme = computed(() => (isDark.value ? "i-bx-sun" : "i-bx-moon"));

const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};

const queryParams: QueryParams = {
    q: filter.value?.value === 'all' ? search.value : undefined,
    title: filter.value?.value === "title" ? search.value : undefined,
    author: filter.value?.value === "author" ? search.value : undefined,
    first_publish_year: year.value || undefined,
    limit: limit.value,
    page: page.value,
  };

const navigationLinks = [
  {
    label: "Home",
    icon: "i-bx-home",
    to: "/",
  },
  {
    label: "Libros",
    icon: "i-bx-book-open",
    to: "/books",
  },
];

const clickLogout = () => {
    logout();
    router.push('/login');
};
</script>
