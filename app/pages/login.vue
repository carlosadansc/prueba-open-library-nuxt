<template>
  <UAuthForm
    title="Login"
    submit-text="Iniciar sesión"
    description="Ingresa tu correo y contraseña"
    icon="i-lucide-user"
    :fields="fields"
    class="max-w-md"
    @submit="submit"
  />
</template>

<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import type { User } from "~/interfaces/User";

const { setUser } = useAuth();
const router = useRouter();

definePageMeta({
  layout: "main",
  name: "login",
  title: "Login",
  icon: "i-lucide-user",
  path: "/login",
  requiresAuth: false,
});

const fields = ref<AuthFormField[]>([
  {
    name: "email",
    type: "email",
    label: "Correo",
  },
  {
    name: "password",
    type: "password",
    label: "Contraseña",
  },
]);

const submit = async (data: FormSubmitEvent<User>) => {
  setUser(data.data);
  router.push("/");
};
</script>
