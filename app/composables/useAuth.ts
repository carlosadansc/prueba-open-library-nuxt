import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import type { User } from "~/interfaces/User";

export const useAuth = () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const setUser = (user: User | null) => {
    authStore.setUser(user);
  };

  const logout = () => {
    authStore.setUser(null);
  };

  const isLoggedIn = computed(() => {
    return !!user.value;
  });

  return { user, setUser, logout, isLoggedIn };
};
