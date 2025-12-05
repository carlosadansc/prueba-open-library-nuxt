<template>
  <header class="flex items-center justify-end p-4">
    <ClientOnly>
      <UButton size="md" color="gray" variant="ghost" :icon="iconTheme" @click="toggleTheme" class="rounded-full" />
    </ClientOnly>
  </header>

  <div class="flex items-center justify-center h-[calc(100vh-16rem)]">
    <slot />
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const iconTheme = computed(() => isDark.value ? 'i-bx-sun' : 'i-bx-moon')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

</script>