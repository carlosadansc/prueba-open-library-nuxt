<template>
  <UCard class="w-60 flex flex-col justify-between">
    <template #header>
      <h1 class="text-sm font-semibold italic">{{ props.title }}</h1>
    </template>
    <img src="https://cdn.pixabay.com/photo/2016/10/06/19/02/book-1719737_1280.png" alt="">
    <template #footer>
     <h3 class="text-xs">{{ props.authorName }} - <span>{{ props.firstPublishYear }}</span></h3>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string,
    authorName: string,
    firstPublishYear: number
}>();
</script>