<template>
    <div>
        <h1 class="font-bold">Open Library API | Nuxt4 + Vue + Pinia</h1>
        <p class="mt-4 italic">Bienvenido a la aplicación de Open Library API | Test técnico Carlos Adán Sánchez Ceseña</p>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth',
    layout: 'dashboard',
    name: 'home',
    title: 'Home',
    icon: 'i-bx-home',
    path: '/',
    requiresAuth: true
})

</script>